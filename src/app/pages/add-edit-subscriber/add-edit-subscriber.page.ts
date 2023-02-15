import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
import { FormControl } from '@angular/forms';


export interface POE {
  name: string,
  title: string,
}

@Component({
  selector: 'app-add-edit-subscriber',
  templateUrl: './add-edit-subscriber.page.html',
  styleUrls: ['./add-edit-subscriber.page.scss'],
})
export class AddEditSubscriberPage implements OnInit {
  myControl = new FormControl('');
  filtered_options: any;

  subscriber: any;

  dropdown: any = {
    'app_category': [],
    'app_category2': [],
    'app_category3': [],
    'app_collector': [],
    'app_country': [],
    'app_currency': [],
    'app_extra_g': [],
    'app_node': [],
    'app_service': [],
    'disable_reasons': [],
    'mobile_pfx': [],
    'ticket_open_predefined': [],
    'ticket_task_predefined': [],
    'ticket_type': [],
    'app_ticket_type': []
  }

  data: any;
  headers: any;
  new_subscriber: boolean = true;
  poe: POE[] = [];
  subscriber_id: any;
  action: any = 'add';
  app_subscriber_subscription_date: any = new Date().toISOString();

  node_list_visible: boolean = false;

  //ngmodels
  app_subscriber_name: any;
  app_subscriber_username: any = '';
  app_subscriber_password: any = '';
  app_subscriber_login_password: any;
  app_subscriber_email: any;
  app_subscriber_address: any;
  app_country_id: any;
  app_country_nationality: any;
  mobile_prefix_code = 961;
  app_subscriber_mobile: any;
  app_subscriber_phone: any;
  is_expired: any;
  app_service_id: any;
  app_service_name: any;
  disable_service: any;
  app_subscriber_auto_recharge: any;
  app_subscriber_poe: any;
  show_finance_options = false;
  app_parent_account_id: any;
  parent_account: any;
  app_payment_type_id: any;
  payment_type: any;
  app_collector_id: any;
  app_category_1_id: any;
  app_category_2_id: any;
  app_category_3_id: any;
  app_subscriber_credit_limit: any;
  app_subscriber_credit_limit_code: any;
  app_subscriber_grace_period: any;
  app_subscriber_grace_period_desc: any;
  app_subscriber_disc_val: any;
  app_subscriber_disc_desc: any;
  app_subscriber_add_val: any;
  app_subscriber_add_desc: any;
  app_subscriber_disc_curr: any;
  app_subscriber_disc_code_id: null;
  app_subscriber_add_code_id: any;
  app_subscriber_add_curr: null;
  app_currencies: any = [];
  app_collector_name: any;
  app_subscriber_mac: any;
  data_node: any;
  app_node = {
    app_node_name: '',
    app_node_id: '',
  };


  constructor(
    private apiService: ApiService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard,
    private toastCtrl: ToastController) {
    this.poe.push({ name: 'true', title: 'True' });
    this.poe.push({ name: 'false', title: 'False' });
  }



  async getDropDownLists() {
    let url = this.data.subscriber_account.server_link + '/api/dropdown_list.php';

    let apiData = {
      "app_dealer_id": this.data.app_dealer_id,
      "app_currency_rate": this.data.currency_rate,
      "user_id": this.data.user_id
    }
    const response = await this.apiService.post(url, this.headers, apiData);
    let res = await JSON.parse(response.data);
    this.dropdown = res;
    console.log(res);


    if (this.dropdown.app_currency != null) {
      for (let i = 0; i < this.dropdown.app_currency.length; i++) {
        if (this.dropdown.app_currency[i].app_currency_id != "%") {
          this.app_currencies.push(this.dropdown.app_currency[i]);
        }
      }
    }

    this.filtered_options = this.dropdown.app_node;
  }

  generatePassword() {
    this.app_subscriber_login_password = '';
    let length = 10;
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      this.app_subscriber_login_password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  copyPassword() {
    this.clipboard.copy(this.app_subscriber_login_password);
  }
  onChangeTime(e: any) {
  //  this.app_subscriber_username.includes(' ') && 
  //  this.app_subscriber_username.replaceAll(' ','');
  //  this.app_subscriber_password.includes(' ') && this.app_subscriber_password.replaceAll(' ','');
   
  }


  clear(type: string) {
    if (type === 'credit_limit') {
      this.app_subscriber_credit_limit_code = null;
      this.app_subscriber_credit_limit = null;
    } else if (type === 'discount') {
      this.app_subscriber_disc_val = null;
      this.app_subscriber_disc_code_id = null;
      this.app_subscriber_disc_curr = null;
    } else if (type === 'addition') {
      this.app_subscriber_add_val = null;
      this.app_subscriber_add_code_id = null;
      this.app_subscriber_add_curr = null;
    } else if (type === 'app_pwd') {
      this.app_subscriber_login_password = null;
    } else if (type === 'collector') {
      this.app_collector_id = null;
    }
    else if (type === 'cat1') {
      this.app_category_1_id = null;
    } else if (type === 'cat2') {
      this.app_category_2_id = null;
    } else if (type === 'cat3') {
      this.app_category_3_id = null;
    }
  }

  async initSubscriberData() {
    console.log(this.subscriber);

    this.app_subscriber_name = this.subscriber.app_subscriber_name;
    this.app_subscriber_username = this.subscriber.app_subscriber_username;
    this.app_subscriber_password = this.subscriber.app_subscriber_password;
    this.app_subscriber_login_password = this.subscriber.app_subscriber_login_password;
    this.app_subscriber_email = this.subscriber.app_subscriber_email;
    this.app_subscriber_address = this.subscriber.app_subscriber_address;
    this.app_country_id = this.subscriber.app_country_id;
    this.mobile_prefix_code = this.subscriber.app_subscriber_mobile_pfx;
    this.app_subscriber_mobile = this.subscriber.app_subscriber_mobile;
    this.app_subscriber_phone = this.subscriber.app_subscriber_phone;
    this.is_expired = this.subscriber.is_expired;
    this.app_service_id = this.subscriber.app_service_id;
    this.app_service_name = this.subscriber.app_service_name;
    this.app_subscriber_auto_recharge = this.subscriber.app_subscriber_auto_recharge;
    this.app_subscriber_poe = this.subscriber.app_subscriber_poe;
    this.app_parent_account_id = this.subscriber.index_id;
    this.app_payment_type_id = this.subscriber.app_payment_type_id;
    this.app_collector_id = this.subscriber.app_collector_id;
    this.app_category_1_id = this.subscriber.app_category_1_id;
    this.app_category_2_id = this.subscriber.app_category_2_id;
    this.app_category_3_id = this.subscriber.app_category_3_id;
    this.app_subscriber_credit_limit = this.subscriber.app_subscriber_credit_limit;
    this.app_subscriber_credit_limit_code = this.subscriber.app_subscriber_credit_limit_code;
    this.app_subscriber_grace_period = this.subscriber.app_subscriber_grace_period;
    this.app_subscriber_grace_period_desc = this.subscriber.app_subscriber_grace_period_desc;
    this.app_subscriber_disc_val = this.subscriber.app_subscriber_disc_val;
    this.app_subscriber_disc_desc = this.subscriber.app_subscriber_disc_desc;
    this.app_subscriber_add_val = this.subscriber.app_subscriber_add_val;
    this.app_subscriber_add_desc = this.subscriber.app_subscriber_add_desc;
    this.app_node.app_node_id = this.subscriber.app_node_id;
    this.app_node.app_node_name = this.subscriber.app_node_name;
    this.app_subscriber_disc_curr = this.subscriber.app_subscriber_disc_curr;
    this.app_subscriber_disc_code_id = this.subscriber.app_subscriber_disc_code;
    this.app_subscriber_add_code_id = this.subscriber.app_subscriber_add_code;
    this.app_subscriber_add_curr = this.subscriber.app_subscriber_add_curr;
    this.app_subscriber_mac = this.subscriber.app_subscriber_mac;

    if (this.subscriber.is_expired == '0') {
      this.is_expired = false;
    } else if (this.subscriber.is_expired == '1') {
      this.is_expired = true;
    }

    if (this.subscriber.app_subscriber_poe === null) {
      this.app_subscriber_poe = this.poe[1].name;
    }
    if (this.subscriber.app_subscriber_mobile_pfx != null) {
      this.mobile_prefix_code = this.subscriber.app_subscriber_mobile_pfx;
    }
    if (this.subscriber.app_subscriber_auto_recharge == '1') {
      this.app_subscriber_auto_recharge = true;

    } else if (this.subscriber.app_subscriber_auto_recharge == '0') {
      this.app_subscriber_auto_recharge = false;
    }

    if (this.subscriber.app_node_id > 0) {
      for (let i = 0; i < this.dropdown.app_node.length; i++) {
        if (this.dropdown.app_node[i].app_node_id === this.subscriber.app_node_id) {
          this.app_node.app_node_name = this.dropdown.app_node[i].app_node_name;
        }
      }
    }
    if (this.subscriber.app_country_id > 0) {
      for (let i = 0; i < this.dropdown.app_country.length; i++) {
        if (this.dropdown.app_country[i].app_country_id === this.subscriber.app_country_id) {
          this.app_country_nationality = this.dropdown.app_country[i].app_country_nationality;
          // this.app_country_id = this.app_country[i].app_country_id;
        }
      }
    }
    if (this.subscriber.app_subscriber_category_id != null) {
      for (let i = 0; i < this.dropdown.app_category.length; i++) {
        if (this.dropdown.app_category[i].app_subscriber_category_id == this.subscriber.app_subscriber_category_id) {
          this.app_category_1_id = this.dropdown.app_category[i].app_subscriber_category_id;
        }
      }
    }
    if (this.subscriber.app_subscriber_category_id2 != null) {
      for (let i = 0; i < this.dropdown.app_category2.length; i++) {
        if (this.dropdown.app_category2[i].app_subscriber_category_id === this.subscriber.app_subscriber_category_id2) {
          this.app_category_2_id = this.dropdown.app_category2[i].app_subscriber_category_id;
        }
      }
    }
    if (this.subscriber.app_subscriber_category_id3 != null) {
      for (let i = 0; i < this.dropdown.app_category3.length; i++) {
        if (this.dropdown.app_category3[i].app_subscriber_category_id === this.subscriber.app_subscriber_category_id3) {
          this.app_category_3_id = this.dropdown.app_category3[i].app_subscriber_category_id;
        }
      }
    }
    if (this.subscriber.app_service_id > 0) {
      for (let i = 0; i < this.dropdown.app_service.length; i++) {
        if (this.dropdown.app_service[i].app_service_id === this.subscriber.app_service_id) {
          this.app_service_id = this.dropdown.app_service[i].app_service_id;
          this.app_service_id = this.dropdown.app_service[i].app_service_name;
        }
      }
    }
    if (this.subscriber.app_collector_id > 0) {
      for (let i = 0; i < this.dropdown.app_collector.length; i++) {
        if (this.dropdown.app_collector[i].app_collector_id === this.subscriber.app_collector_id) {
          this.app_collector_id = this.dropdown.app_collector[i].app_collector_id;
          this.app_collector_name = this.dropdown.app_collector[i].app_collector_name;
        }
      }
    }
  }

  async getSubscriber() {

    let url = this.data.subscriber_account.server_link + '/api/get_users.php';
    let apiData = {
      "app_dealer_id": this.data.app_dealer_id,
      "app_subscriber_id": this.subscriber_id,
      "app_currency_rate": this.data.app_currency_rate,
    }
    const response = await this.apiService.post(url, this.headers, apiData);
    let subscriber = await JSON.parse(response.data);
    this.subscriber = subscriber.subscriber;
    console.log(this.subscriber);

    this.initSubscriberData();

  }

  async getParent() {

    let url = this.data.subscriber_account.server_link + '/api/action.php';
    let apiData = {
      "type": "get_add_subscriber",
      "app_dealer_id": this.data.app_dealer_id,
    }

    if (this.data.is_account === '1') {
      this.show_finance_options = true;
      const response = await this.apiService.post(url, this.headers, apiData);
      let res = await JSON.parse(response.data);
      this.parent_account = res.account;
      this.payment_type = res.payment_type;
    }

  }

  async submit() {
    if (this.dropdown.app_node != null) {
      for (let i = 0; i < this.dropdown.app_node.length; i++) {
        if (this.dropdown.app_node[i].app_node_name === this.app_node.app_node_name) {
          this.app_node.app_node_id = this.dropdown.app_node[i].app_node_id;
        }
      }
    }
    let url = this.data.subscriber_account.server_link + '/api/action.php';

    let apiData = {
      action: this.action,
      user_id: this.data.user_id,
      app_dealer_id: this.data.app_dealer_id,
      app_country_id: this.app_country_id,
      app_service_id: this.app_service_id,
      app_collector_id: this.app_collector_id,
      app_subscriber_category_id: this.app_category_1_id,
      app_subscriber_category_id2: this.app_category_2_id,
      app_subscriber_category_id3: this.app_category_3_id,
      app_subscriber_address: this.app_subscriber_address,
      app_subscriber_email: this.app_subscriber_email,
      app_subscriber_id: this.subscriber_id,
      app_subscriber_mac: this.app_subscriber_mac,
      app_subscriber_mobile: this.app_subscriber_mobile,
      app_subscriber_name: this.app_subscriber_name,
      app_subscriber_password: this.app_subscriber_password,
      app_subscriber_login_password: this.app_subscriber_login_password,
      app_subscriber_phone: this.app_subscriber_phone,
      app_subscriber_subscription_date: this.app_subscriber_subscription_date,
      app_subscriber_username: this.app_subscriber_username,
      app_subscriber_auto_recharge: this.app_subscriber_auto_recharge,
      app_subscriber_mobile_pfx: this.mobile_prefix_code,
      app_subscriber_disc_code: this.app_subscriber_disc_code_id,
      app_subscriber_disc_val: this.app_subscriber_disc_val,
      app_subscriber_disc_desc: this.app_subscriber_disc_desc,
      app_subscriber_disc_curr: this.app_subscriber_disc_curr,
      app_subscriber_add_code: this.app_subscriber_add_code_id,
      app_subscriber_add_val: this.app_subscriber_add_val,
      app_subscriber_add_desc: this.app_subscriber_add_desc,
      app_subscriber_add_curr: this.app_subscriber_add_curr,
      app_subscriber_grace_period: this.app_subscriber_grace_period,
      app_subscriber_grace_period_desc: this.app_subscriber_grace_period_desc,
      app_subscriber_credit_limit: this.app_subscriber_credit_limit,
      app_subscriber_credit_limit_code: this.app_subscriber_credit_limit_code,
      app_subscriber_poe: this.app_subscriber_poe,
      app_node_id: this.app_node.app_node_id,
      app_payment_type_id: this.app_payment_type_id,
      index_id: this.app_parent_account_id,
    };
    if (this.action === "modify") {
      apiData.app_service_id = null;
      apiData.app_subscriber_subscription_date = null;
    }
    if (this.action === "add") {
      apiData.app_subscriber_id = null;
    }
    const response = await this.apiService.post(url, this.headers, apiData);
    console.log(response);
    let res = await response.data;
    await this.handleResponse(res);

  }

  async handleResponse(response_data: any) {

    if (response_data.type === "success") {
      this.action === "add" ?
        this.toast("User: " + this.app_subscriber_name + " was successfully added!", "bottom", 3000, "success") :
        this.toast("User: " + this.app_subscriber_name + " was successfully edited!", "bottom", 3000, "success");
      this.router.navigate(['/main-view', { refresh: true }], { replaceUrl: true });//refreshhhh

    }
    else {
      let errorText = response_data.error_text;
      this.toast("Error: " + errorText, "bottom", 3000, "error");
    }
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

  reset_poe() {
    this.app_subscriber_poe = null;
  }
  changed(ev: any, type: string) {    //if select changed
    // console.log(ev);
    if (ev == -999) {
      if (type === 'addition') {
        this.clear('addition');
      } else if (type === 'discount') {
        this.clear('discount')
      }
    } else {
      if (type === 'service') {
        for (let i = 0; i < this.dropdown.app_service.length; i++) {
          if (this.dropdown.app_service[i].app_service_id === ev && this.dropdown.app_service[i].app_service_is_auto_recharge === "1") {
            this.app_subscriber_auto_recharge = true;
            this.disable_service = false;
          }
          else if (this.dropdown.app_service[i].app_service_id === ev && this.dropdown.app_service[i].app_service_is_auto_recharge === "0") {
            this.app_subscriber_auto_recharge = false;
            this.disable_service = true;
          }
        }
      } else if (type === 'discount') {
        for (let i = 0; i < this.dropdown.app_currency.length; i++) {

          if (ev === this.dropdown.app_currency[i].app_currency_id) {
            this.app_subscriber_disc_curr = this.dropdown.app_currency[i].app_currency_code;
          }

        }
      }
      else if (type === 'addition') {
        for (let i = 0; i < this.dropdown.app_currency.length; i++) {

          if (ev === this.dropdown.app_currency[i].app_currency_id) {
            this.app_subscriber_disc_curr = this.dropdown.app_currency[i].app_currency_code;
          }

        }
      }
    }
  }

  showDataList() { // nodeList show
    this.node_list_visible = true;
  }
  hideDataList() { // nodeList hide
    setTimeout(() => {
      // to give time for the click on item before closing
      this.node_list_visible = false;
    }, 100);
  }

  async selectNode(e: any) {
    this.app_node.app_node_name = await e.target.innerText;
    this.hideDataList();
  }

  filterNodeList(e: any) {
    this.reset_poe();
    const filterValue = e.target.value.toLowerCase();
    this.filtered_options = this.dropdown.app_node.filter((option: any) => option.app_node_name.toLowerCase().includes(filterValue));

  }


  ////////////////////////////////////////////////////////////////

  async ngOnInit() {
    //
    this.route.params.subscribe(async params => {
      this.new_subscriber = await params['new_subscriber'] === 'true' ? true : false;
      if (this.new_subscriber) {
        this.action = 'add';
      }
      else {
        this.action = 'modify';
      }
      this.subscriber_id = params['subscriber_id'];
    })
    ///

    //
    await this.storage.get('data').then((data: any) => {
      this.data = data

      this.headers = this.apiService.getHeaders(data.jwt)

    });
    ///

    //
    await this.getDropDownLists();
    ///

    //
    await this.getParent();
    ///

    //
    if (!this.new_subscriber) {
      await this.getSubscriber();
      await this.initSubscriberData();
    }
    ///

  }

  ////////////////////////////////

}
