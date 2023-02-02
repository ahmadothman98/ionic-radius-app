import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-subscriber-details',
  templateUrl: './subscriber-details.page.html',
  styleUrls: ['./subscriber-details.page.scss'],
})
export class SubscriberDetailsPage implements OnInit {

  subscriber_id: any;
  subscriber: any = null;
  over_credit_limit: boolean;
  active_grace_icon: string;
  activeCSS: string;
  onlineCSS: string;
  token: any;
  headers: any;
  data: any;
  consumption: any;
  speed: any = null;
  is_map: boolean;
  is_account: any;
  confirm_call: boolean;
  subscriber_details_fields : any;
  skeleton_items = Array(20).fill(1);
  skeleton_items2 = Array(2).fill(1)

  constructor(private route: ActivatedRoute, private storage: StorageService, private apiService: ApiService, private clipboard: Clipboard, private alertCtrl: AlertController, private toastCtrl: ToastController, private callNumber: CallNumber) {
    this.subscriber_id = this.route.params.subscribe(async (params: any) => {
      this.subscriber_id = params.subscriber_id;
    })
  }










  async getConsumption() {
    let url = this.data.subscriber_account.server_link + '/api/subs_consumption.php';

    let apiData = {
      "app_subscriber_id": this.subscriber_id
    }
    const response = await this.apiService.post(url, this.headers, apiData);
    let res = await JSON.parse(response.data);
    this.speed = res[0]
    this.consumption = res[1]
    console.log(this.consumption);
    
  }
  async getSubscriberDetails() {

    let url = this.data.subscriber_account.server_link + '/api/get_users.php';

    let apiData = {
      "app_dealer_id": this.data.app_dealer_id,
      "app_subscriber_id": this.subscriber_id,
      "app_currency_rate": this.data.app_currency_rate,

    }

    const response = await this.apiService.post(url, this.headers, apiData);
    let subscriber = await JSON.parse(response.data);
    return subscriber;
  }



  async toast(msg: string, pos: any, dur: number, css_cls: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: pos,
      duration: dur,
      cssClass: css_cls
    });
    toast.present();
  }
  copy(type: string) {
    console.log(type);
    if (type === 'pw') {
      this.clipboard.copy(this.subscriber.app_subscriber_password);
      this.toast("Password copied!", "bottom", 3000, "success");
    } else if (type === 'app_pw') {
      this.clipboard.copy(this.subscriber.app_subscriber_login_password);
      this.toast("Login password copied!", "bottom", 3000, "success");
    } else if (type === 'mobile') {
      this.clipboard.copy(this.subscriber.app_subscriber_mobile);
      this.toast("Mobile number copied!", "bottom", 3000, "success");
    } else if (type === 'phone') {
      this.clipboard.copy(this.subscriber.app_subscriber_phone);
      this.toast("Phone number copied!", "bottom", 3000, "success");
    } else if (type === 'username') {
      this.clipboard.copy(this.subscriber.app_subscriber_username);
      this.toast("Username copied!", "bottom", 3000, "success");
    }
  }

  async call_whatsapp() {
    if (this.subscriber.app_subscriber_mobile != null) {
      let element = document.createElement('a') as HTMLElement;
      element.setAttribute('href', 'https://wa.me/' + this.subscriber.app_subscriber_mobile_pfx + this.subscriber.app_subscriber_mobile);
      element.setAttribute('style', 'display:none;');
      element.click();
    } else {
      let alert = await this.alertCtrl.create({
        header: "WhatsApp number NOT found!",
        subHeader: "Please update their number, then try again!",
        buttons: ["Dismiss!"]
      });
      alert.present();
    }
    // }
  }

  async call_number() {
    let alert = await this.alertCtrl.create({
      header: "Call this number?",
      subHeader: "Your carrier may charge you for this call!",
      buttons: [{ text: 'Call', handler: () => { this.confirm_call = true } }, { text: 'Cancel', handler: () => { this.confirm_call = false } }]
    });
    alert.present();
    alert.onDidDismiss().then(() => {

      if (this.confirm_call === true) {
        this.callNumber.callNumber(this.subscriber.app_subscriber_mobile, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));
      }
    });

  }


  ngOnInit() {

    this.storage.get('data').then(async (data) => {
      this.data = data;
      this.headers = this.apiService.getHeaders(data.jwt)
      this.is_account = this.data.is_account;
      this.is_map = data.is_map;
      let subscriber_response = await this.getSubscriberDetails();
      this.subscriber = subscriber_response.subscriber;

      this.route.params.subscribe(params => {
        this.token = params['token'];
      })

      if (this.subscriber.app_subscriber_on_grace_period == "1") {

        this.over_credit_limit = true;
        this.active_grace_icon = "grace_period_octa";
        this.activeCSS = "enabled_css";
      }
      else {
        this.subscriber.app_subscriber_is_active == "1" ? this.activeCSS = "enabled_css" : this.activeCSS = "disabled_css";
        this.active_grace_icon = "active_person_octa";
      }
      this.subscriber.app_subscriber_is_online == "1" ? this.onlineCSS = "online_css" : this.onlineCSS = "offline_css";
      console.log(this.subscriber.app_subscriber_is_active)
      await this.getConsumption()



    })

  }
}
