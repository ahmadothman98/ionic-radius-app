import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ApiService } from '../../services/api/api.service';
import { IonContent, MenuController, ModalController, AnimationController } from '@ionic/angular';
import { App, AppInfo } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { DEF } from '../../../providers/definitions/definitions';
import { UserPopupComponent } from 'src/app/components/user-popup/user-popup.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.page.html',
  styleUrls: ['./main-view.page.scss'],
})

export class MainViewPage implements OnInit {

  @ViewChild('content') content: IonContent;
  @ViewChild('all_users') all_users: QueryList<any>;

  token: any;
  data: any;

  page_no: number = 0;
  user_list: any;
  subscribers_list_title: string = "Subscribers List";
  headers: any;
  user_per_page: number = 100;
  next_page_exists: boolean = false;
  rendered_page_number: number = 0;
  menu_pages : { title: string; page_name: string; icon: string; }[] = [];
  condition_list = [
    { title: 'ALL', condition: 'all', totals: '', icon: 'all_octa' },
    { title: 'ONLINE', condition: 'online', totals: '', icon: 'online_octa' },
    { title: 'OFFLINE', condition: 'offline', totals: '', icon: 'offline_octa' },
    { title: 'ENABLED', condition: 'enabled', totals: '', icon: 'active_octa' },
    { title: 'DISABLED', condition: 'disabled', totals: '', icon: 'disabled_octa' },
    { title: 'EXPIRED', condition: 'expired', totals: '', icon: 'expired_octa' },
    { title: 'ARCHIVED', condition: 'archived', totals: '', icon: 'archived_octa' },
    { title: 'INFECTED', condition: 'infected', totals: '', icon: 'infected_octa' },
    { title: 'GRACE PERIOD', condition: 'grace_period', totals: '', icon: 'grace_period_octa' }
  ];
  selected_condition = this.condition_list[0];

  user_modal: any;
  anim: any;
  balance: string | number = 0;
  app_info: AppInfo;
  app_version: string;
  pref_lang: string = 'en';
  skeleton_items = Array(20).fill(1);
  loaded: boolean = false;
  page_change = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private storage: StorageService,
    private platform: Platform,
    private menuCtrl : MenuController,
    private modalCtrl : ModalController,
    private   animationCtrl: AnimationController
  ) {
      // if (this.privilages_form.service_pricing_form.is_permit === '1') {
        this.menu_pages?.push({ title: this.pref_lang === "ar" ? DEF.AR_MY_SERVICES : DEF.EN_MY_SERVICES, page_name: 'my-services', icon: 'services_octa' });
        // }
        // if (this.financial_forms.show_pages === 1) {
          this.menu_pages?.push({ title: this.pref_lang === "ar" ? DEF.AR_FINANCIAL : DEF.EN_FINANCIAL, page_name: 'financial-management', icon: 'cash_octa' });
        // }
        // if (this.privilages_form.recharge_form.is_permit === '1') {
          this.menu_pages?.push({ title: this.pref_lang === "ar" ? DEF.AR_RECHARGE : DEF.EN_RECHARGE, page_name: 'recharge', icon: 'recharge_octa' });
        // }
        // if (this.privilages_form.collection_summary_report.is_permit === '1') {
          this.menu_pages?.push({ title: this.pref_lang === "ar" ? DEF.AR_COLLECTOR_SUMMARY_PAGE_TITLE : DEF.EN_COLLECTOR_SUMMARY_PAGE_TITLE, page_name: 'collector-summary', icon: 'collector_summary_octa' });
        // }
        // if (this.privilages_form.my_dealers_form.is_permit === '1') {
          this.menu_pages?.push({ title: this.pref_lang === "ar" ? DEF.AR_MY_DEALERS : DEF.EN_MY_DEALERS, page_name: 'my-dealers', icon: 'dealers_octa' });
        // }
        this.menu_pages?.push({ title: this.pref_lang === "ar" ? DEF.AR_CATEGORY : DEF.EN_CATEGORY, page_name: 'category', icon: 'category_view_octa' });
        
   }

  logout() {
    this.storage.remove('data');
    this.router.navigate(['/login'], { replaceUrl: true });
  }


  async initData() {

    await this.get_conditions();
    this.user_list = await this.getUsers(0);
    this.user_per_page = this.user_list.length;
    await this.get_balance();
    await this.getAppVersion();
    return this.data;
  }

  async getAppVersion(){
    
    
    if( (this.platform.is('android') || this.platform.is('ios')) && !this.platform.is('mobileweb')){
      
      App.getInfo().then((info) => {
        this.app_info = info;
        
        this.app_version = this.app_info.version;
      })
    }
    else{
      this.app_version = 'N/A';
    }

    
  
  }
  

  async get_balance() {
    let url = this.data.user_account.server_link + '/api/action.php';
    let apiData = {
      action:"get_account_balance",
      app_collector_id:this.data.app_collector_id,
      app_dealer_id:this.data.app_dealer_id,
      app_maintainer_id: this.data.app_maintainer_id,
    }
    const response = await this.apiService.post(url, this.headers, apiData);
    this.balance = JSON.parse(response.data).balance;
    
  }

  async getUsers(page: number = 0) {

    let url = this.data.user_account.server_link + '/api/get_users.php';

    let apiData = {
      "app_dealer_id": this.data.app_dealer_id,
      "user_id": this.data.user_id,
      "group_id": this.data.group_id,
      "app_currency_rate": this.data.app_currency_rate,
      "condition": this.selected_condition.condition,
      "page_no": page
    }

    const response = await this.apiService.post(url, this.headers, apiData);
    let user_list: [] = await JSON.parse(response.data).subscriber;


    return user_list;

  }

  async get_conditions() {
    let url = this.data.user_account.server_link + '/api/app_dealer_counters.php';
    let apiData = {
      "app_dealer_id": this.data.app_dealer_id,
      "user_id": this.data.user_id,
    }
    const response = await this.apiService.post(url, this.headers, apiData);

    let data = JSON.parse(response.data);

    this.condition_list[0].totals = data.total_subs;
    this.condition_list[1].totals = data.online;
    this.condition_list[2].totals = data.offline;
    this.condition_list[3].totals = data.active;
    this.condition_list[4].totals = data.suspended;
    this.condition_list[5].totals = data.expiry;
    this.condition_list[6].totals = data.archived;
    this.condition_list[7].totals = data.infected;
    this.condition_list[8].totals = data.over_credit_limit;

  }

  async change_condition(condition: { title: string, condition: string, totals: string, icon: string; }) {
    this.user_list = null;
    this.selected_condition = condition;

    this.page_change = false;
    this.loaded = false;
    // this.start_loading().then(async () => {
    this.user_list = await this.getUsers()
    this.loaded = true;
    

    // this.stop_loading();
    this.page_no = 0;
    this.rendered_page_number = 0;
    // });

  }

  // async start_loading() {
  //   this.loading = await this.loadingCtrl.create({
  //     message: 'Loading Page ...',
  //   });
  //   this.loading.present();
  // }
  // async stop_loading() {
  //   this.loading.dismiss();
  // }
  async pageChanged(page: number) {
    if (page >= 0) {
      // this.loading = await this.loadingCtrl.create({
      //   message: 'Getting Data',
      // });
      // await this.loading.present();
      this.loaded = false;
      this.page_change = true;
      this.page_no = page;
      this.user_list = await this.getUsers(this.page_no);
      this.rendered_page_number = this.page_no;
      this.loaded = true;

      // await this.loading.dismiss();
    }
    this.content.scrollToTop(100).then(() => {

    })
  }
  pageExists(page_to_check: number) {
    let page_exists = this.user_per_page * (page_to_check) < parseInt(this.selected_condition.totals) ? true : false; // check for next page
    return page_exists;
  }



  refresh_balance(){

  }
  navigateToPage(page_name: any){
    console.log('should_navigatenavigate');
    let page = '/' + page_name;
    this.router.navigate([page]);

  }

  //
  //
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      //@ts-ignore
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      //@ts-ignore

      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0.99', transform: 'translate(100%,0)' },
        { offset: 1, opacity: '0.99', transform: 'translate(15%,0)', width: '85%' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(200)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
  async user_menu(user?: any) {
    const modal = await this.modalCtrl.  create({
      component:  UserPopupComponent,
      componentProps: {
        user : user
      },
      animated: true,
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation,

    });
    modal.present();
    }

  ngOnInit() {
    this.storage.get('data').then(async (data) => {
      this.data = data;

      this.headers = this.apiService.getHeaders(data.jwt)
      // this.start_loading().then(async () => {
        
      this.page_change = false;

      this.loaded = false;
      await this.initData().then((data) => {
        this.loaded = true;
        // this.stop_loading();
      })

    });



    // });

    this.route.params.subscribe(params => {
      this.token = params['token'];
    })


  }

}