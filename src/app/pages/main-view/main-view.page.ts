import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ApiService } from '../../services/api/api.service';
import { IonContent,  ModalController, AnimationController, IonSearchbar } from '@ionic/angular';
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
[x: string]: any;

  @ViewChild('content') content: IonContent;
  @ViewChild('searchBar') searchBar : IonSearchbar;

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
  conditions_loaded = false;
  search_value = '';
  hide_search = true;
  is_search: boolean = false; 
  current_page_color = 'primary'
  next_page_color = 'secondary';
  prev_page_color = 'secondary';
  debounce_duration = 1000;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private storage: StorageService,
    private platform: Platform,
    private modalCtrl : ModalController,
    private animationCtrl: AnimationController
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
    //data initialization

    this.conditions_loaded = false;
    await this.getConditions(); // get totals of conditions
    let data = await this.getUsers(0);
    this.user_list = data.subscriber // load user list
    
    this.user_per_page = this.user_list.length; 
    await this.getBalance(); 
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
  

  async getBalance() {
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

  async getUsers(page: number = 0, search_value= this.search_value) {

    let url = this.data.user_account.server_link + '/api/get_users.php';

    let apiData = {
      "app_dealer_id": this.data.app_dealer_id,
      "user_id": this.data.user_id,
      "group_id": this.data.group_id,
      "app_currency_rate": this.data.app_currency_rate,
      "condition": this.selected_condition.condition,
      "page_no": page
    }
    if(search_value){
      
      Object.assign(apiData, {"search_value": search_value})
    }
    
    const response = await this.apiService.post(url, this.headers, apiData);
    let data = await JSON.parse(response.data);
    this.next_page_exists = data.load_more;
    return data;
  }

  async getConditions() {
    let url = this.data.user_account.server_link + '/api/app_dealer_counters.php';
    let apiData = {
      "app_dealer_id": this.data.app_dealer_id,
      "user_id": this.data.user_id,
    }
    const response = await this.apiService.post(url, this.headers, apiData);

    let data =  await JSON.parse(response.data);
    this.condition_list[0].totals = data.total_subs;
    this.condition_list[1].totals = data.online;
    this.condition_list[2].totals = data.offline;
    this.condition_list[3].totals = data.active;
    this.condition_list[4].totals = data.suspended;
    this.condition_list[5].totals = data.expiry;
    this.condition_list[6].totals = data.archived;
    this.condition_list[7].totals = data.infected;
    this.condition_list[8].totals = data.over_credit_limit;
    this.conditions_loaded = true;

  }

  async changeCondition(condition: { title: string, condition: string, totals: string, icon: string; }) {
    console.log(this.selected_condition.condition, condition.condition, this.is_search);
    
    if(this.selected_condition.condition != condition.condition || this.is_search) {
    console.log('here');
    this.toggleSearch(0)
    this.user_list = null; // reset user list
    this.selected_condition = condition; 
    this.page_change = false; // reload pagination numbers
    this.loaded = false; // load skeletons
    this.search_value = ''; // reset search value    
    this.is_search  = false;
    let data = await this.getUsers(0);
    this.user_list = data.subscriber // load user list

    this.loaded = true; // remove skeletons
    this.page_no = 0; 
    this.rendered_page_number = 0;
    }
  }


  async changePage(page: number) {
    if (page >= 0) {
      this.changePageColor(page);
      this.loaded = false; //load skeletons
      this.page_change = true;
      let data = await this.getUsers(page);
      this.page_no = page;
      this.rendered_page_number = this.page_no;
      this.user_list = data.subscriber // load user list
      this.changePageColor(page);

      
      this.loaded = true; //remove skeletons

    }

  }
  changePageColor(page: number) {
    if(page > this.page_no){
      this.next_page_color = 'primary';
      this.current_page_color = 'secondary';
    }
    else if(page < this.page_no){
      this.prev_page_color = 'primary';
      this.current_page_color = 'secondary';
    }
    else {
      this.current_page_color = 'primary';
      this.next_page_color = 'secondary';
      this.prev_page_color = 'secondary';
    }
  }
  pageExists(page_to_check: number) { // only checks if the next 2 pages exist
    let page_exists = this.user_per_page * (page_to_check) < parseInt(this.selected_condition.totals) ? true : false; // check for page if exists
    return page_exists;
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

  async userMenu(user: any){
    const modal = await this.modalCtrl.  create({
      component:  UserPopupComponent,
      componentProps: {
        user : user
      },
      animated: true,
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation,

    });
    modal.present();}
    
  async filterPopup(){
    console.log('popop');
  }

  async refreshSubscribers(){
    this.conditions_loaded = false; //for animation
    this.getConditions();
    this.user_list = null; // reset user list 
    this.page_change = false; // reload pagination numbers
    this.loaded = false; // load skeletons
    let data = await this.getUsers(0);
    this.user_list = data.subscriber // load user list
    
    this.loaded = true; // remove skeletons
    this.page_no = 0; 
    this.rendered_page_number = 0;
    // this.toggleSearch(0)
  }


  async searchUsers(e: any){
    console.log()
    
    console.log('2');
    
    this.is_search = true;
    this.page_no = 0;
    this.rendered_page_number = 0;
    this.search_value = e.target.value;
    this.loaded = this.page_change = false; // show skeleton
    
    let data = await this.getUsers(0);
    this.user_list = data.subscriber // load user list
    
    this.loaded = this.page_change = true; // remove skeleton
    this.debounce_duration = 1000;
    console.log('here3');
    
  }

  toggleSearch(order : number){
    if(order === 0 ){
      this.hide_search = true;
    }
    else{

      this.hide_search = false;
      this.searchBar.setFocus();
    }

    
  }
  blur(){
    this.hide_search = true;
    if(this.search_value === ''){
      this.changeCondition(this.selected_condition)
    }
  }
  clearSearch(){
    this.search_value = ''
    console.log('cleared');
    
  }

  ngOnInit() {
    this.storage.get('data').then(async (data) => {
      this.data = data;

      this.headers = this.apiService.getHeaders(data.jwt)

      this.page_change = false;

      this.loaded = false;
      await this.initData().then((data) => {
        this.loaded = true;
      })

    });



    // });

    this.route.params.subscribe(params => {
      this.token = params['token'];
    })


  }

}