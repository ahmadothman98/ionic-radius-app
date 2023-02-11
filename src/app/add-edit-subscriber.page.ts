// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ApiService } from 'src/app/services/api/api.service';
// import { StorageService } from 'src/app/services/storage/storage.service';
// import { Clipboard } from '@ionic-native/clipboard/ngx';


// export interface POE {
//   name: string,
//   title: string,
// }

// @Component({
//   selector: 'app-add-edit-subscriber',
//   templateUrl: './add-edit-subscriber.page.html',
//   styleUrls: ['./add-edit-subscriber.page.scss'],
// })
// export class AddEditSubscriberPage implements OnInit {
//   subscriber: any = {
//     "app_subscriber_id": null,
//     "app_service_name": null,
//     "app_subscriber_name": null,
//     "app_subscriber_username": null,
//     "app_subscriber_address": null,
//     "app_subscriber_is_active": null,
//     "app_subscriber_last_login": null,
//     "app_subscriber_last_logout": null,
//     "app_subscriber_macvender": null,
//     "account_name": null,
//     "app_country_id": null,
//     "app_node_id": null,
//     "app_service_id": null,
//     "app_subscriber_email": null,
//     "app_subscriber_disc_code": null,
//     "app_subscriber_disc_val": null,
//     "app_subscriber_disc_desc": null,
//     "app_subscriber_disc_curr": null,
//     "app_subscriber_add_code": null,
//     "app_subscriber_add_val": null,
//     "app_subscriber_add_desc": null,
//     "app_subscriber_add_curr": null,
//     "app_subscriber_grace_period": null,
//     "app_subscriber_grace_period_desc": null,
//     "app_subscriber_credit_limit": null,
//     "app_subscriber_credit_limit_code": null,
//     "app_subscriber_password": null,
//     "app_subscriber_login_password": null,
//     "app_subscriber_auto_recharge": null,
//     "app_subscriber_mobile_pfx": null,
//     "app_subscriber_mobile": null,
//     "app_subscriber_mac": null,
//     "app_subscriber_phone": null,
//     "app_subscriber_poe": null,
//     "app_collector_id": null,
//     "app_payment_type_id": null,
//     "index_id": null,
//     "app_subscriber_last_paid_date": null,
//     "app_subscriber_is_online": null,
//     "app_subscriber_framed_ip": null,
//     "app_subscriber_is_archived": null,
//     "app_account_id": null,
//     "app_subscriber_balance_val": null,
//     "app_subscriber_newer_expiry_date": null,
//     "app_subscriber_remain_day": null,
//     "is_expired": null,
//     "app_service_refundable": null,
//     "app_service_mnth_cdn_group": null,
//     "app_node_name": null,
//     "app_subscriber_on_grace_period": null,
//     "app_currency_id": null,
//     "app_node_lat": null,
//     "app_node_long": null,
//     "app_subscriber_remain_day_mask": null,
//     "is_service_monthly": null,
//     "app_subscriber_category_id" : null,
//     "app_subscriber_category_id2": null,
//     "app_subscriber_category_id3" : null,
//   };

//   dropdown: any = {
//     'app_category': [],
//     'app_category2': [],
//     'app_category3': [],
//     'app_collector': [],
//     'app_country': [],
//     'app_currency': [],
//     'app_extra_g': [],
//     'app_node': [],
//     'app_service': [],
//     'disable_reasons': [],
//     'mobile_pfx': [],
//     'ticket_open_predefined': [],
//     'ticket_task_predefined': [],
//     'ticket_type': [],
//     'app_ticket_type': []
//   }

//   data: any;
//   headers: any;
//   new_subscriber: boolean = true;
//   parent_account: any;
//   payment_type: any;
//   subscriber_id: any;
//   poe: POE[] = [];
//   app_node_name: any;
//   app_country_nationality: any;
//   app_category_1_id: any;
//   app_category_1_name: any;
//   app_category_2_id: any;
//   app_category_2_name: any;
//   app_category_3_id: any;
//   app_category_3_name: any;
//   app_service_id: any;
//   app_collector_id: any;
//   mobile_prefix_code: number = 961;
//   app_subscriber_auto_recharge: boolean;
//   disable_service: boolean;
//   app_subscriber_disc_curr: any;
//   isExpired: boolean;
//   show_finance_options: boolean = false;
//   app_currency1: any;
//   app_parent_account_id: any;
//   app_payment_type_id: any;
//   constructor(private apiService: ApiService, private storage: StorageService, private route: ActivatedRoute, private clipboard: Clipboard) {
//     if (true) {

//     }
//   }



//   async getDropDownLists() {
//     let url = this.data.subscriber_account.server_link + '/api/dropdown_list.php';

//     let apiData = {
//       "app_dealer_id": this.data.app_dealer_id,
//       "app_currency_rate": this.data.currency_rate,
//       "user_id": this.data.user_id
//     }
//     const response = await this.apiService.post(url, this.headers, apiData);
//     let res = await JSON.parse(response.data);
//     this.dropdown = res
//     console.log(res);

//   }
//   generate_password() {
//     this.subscriber.app_subscriber_login_password = '';
//     let length = 10;
//     let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
//     let charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       this.subscriber.app_subscriber_login_password += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//   }

//   copy_password() {
//     this.clipboard.copy(this.subscriber.app_subscriber_login_password);
//   }
//   onChangeTime(e: any) {
//     let strLen = this.subscriber.app_subscriber_password.length;
//     for (let i = 0; i < strLen; i++) {
//       this.subscriber.app_subscriber_password = this.subscriber.app_subscriber_password.replace(" ", "");
//     }

//     strLen = this.subscriber.app_subscriber_username.length;
//     for (let i = 0; i < strLen; i++) {
//       this.subscriber.app_subscriber_username = this.subscriber.app_subscriber_username.replace(" ", "");
//     }
//   }

//   async getAddSubscriber() {
//     let url = this.data.subscriber_account.server_link + '/api/action.php';

//     let apiData = {
//       "type": "get_add_subscriber",
//       "app_dealer_id": this.data.app_dealer_id,
//     }
//     const response = await this.apiService.post(url, this.headers, apiData);
//     let res = await JSON.parse(response.data);
//     this.parent_account = res.account;
//     this.payment_type = res.payment_type;
//     console.log(res);

//   }

//   clear(type: string) {
//     if (type === 'credit_limit') {
//       this.subscriber.app_subscriber_credit_limit_code = null;
//       this.subscriber.app_subscriber_credit_limit = null;
//     } else if (type === 'discount') {
//       this.subscriber.app_subscriber_disc_val = null;
//       this.subscriber.app_subscriber_disc_code_id = null;
//       this.subscriber.app_subscriber_disc_curr = null;
//     } else if (type === 'addition') {
//       this.subscriber.app_subscriber_add_val = null;
//       this.subscriber.app_subscriber_add_code_id = null;
//       this.subscriber.app_subscriber_add_curr = null;
//     } else if (type === 'app_pwd') {
//       this.subscriber.app_subscriber_login_password = null;
//     } else if (type === 'collector') {
//       this.subscriber.app_collector_id = null;
//     }
//     else if (type === 'cat1') {
//       this.app_category_1_id = null;
//     } else if (type === 'cat2') {
//       this.app_category_2_id = null;
//     } else if (type === 'cat3') {
//       this.app_category_3_id = null;
//     }
//   }



//   async getSubscriber() {

//     let url = this.data.subscriber_account.server_link + '/api/get_users.php';
//     let apiData = {
//       "app_dealer_id": this.data.app_dealer_id,
//       "app_subscriber_id": this.subscriber_id,
//       "app_currency_rate": this.data.app_currency_rate,
//     }
//     const response = await this.apiService.post(url, this.headers, apiData);
//     let subscriber = await JSON.parse(response.data);
//     this.subscriber = subscriber;
//     console.log(this.subscriber);


//   }

//   async getParent() {

//     let url = this.data.subscriber_account.server_link + '/api/action.php';
//     let apiData = {
//       "app_dealer_id": this.data.app_dealer_id,
//       "type": "get_add_subscriber",
//     }

//     if (this.data.is_account === '1') {
//       this.show_finance_options = true;
//       const response = await this.apiService.post(url, this.headers, apiData);
//       let res = await JSON.parse(response.data);
//       this.parent_account = res.account;
//       this.payment_type = res.payment_type;

//       // this.app_parent_account_id = this.parent_account[0].app_account_id;
//     }

//     if (this.dropdown.app_currency != null) {
//       for (let i = 0; i < this.dropdown.app_currency.length; i++) {
//         if (this.dropdown.app_currency[i].app_currency_id != "%") {
//           this.app_currency1.push(this.dropdown.app_currency[i]);
//         }
//       }
//     }
//   }

//   submit() {
//   }
//   async initData() {
    

//     this.app_parent_account_id = this.subscriber.index_id;
//     this.app_payment_type_id = this.subscriber.app_payment_type_id;

//     if (this.subscriber.is_expired == '0') {
//       this.isExpired = false;
//     } else if (this.subscriber.is_expired == '1') {
//       this.isExpired = true;
//     }

//     if (this.subscriber.app_subscriber_poe === null) {
//       this.subscriber.app_subscriber_poe = this.poe[1].name;
//     }
//     if (this.subscriber.app_subscriber_mobile_pfx != null) {
//       this.mobile_prefix_code = this.subscriber.app_subscriber_mobile_pfx;
//     }
//     if (this.subscriber.app_subscriber_auto_recharge == '1') {
//       this.app_subscriber_auto_recharge = true;

//     } else if (this.subscriber.app_subscriber_auto_recharge == '0') {
//       this.app_subscriber_auto_recharge = false;
//     }

//     if (this.subscriber.app_node_id > 0) {
//       for (let i = 0; i < this.dropdown.app_node.length; i++) {
//         if (this.dropdown.app_node[i].app_node_id === this.subscriber.app_node_id) {
//           this.app_node_name = this.dropdown.app_node[i].app_node_name;
//         }
//       }
//     }
//     if (this.subscriber.app_country_id > 0) {
//       for (let i = 0; i < this.dropdown.app_country.length; i++) {
//         if (this.dropdown.app_country[i].app_country_id === this.subscriber.app_country_id) {
//           this.app_country_nationality = this.dropdown.app_country[i].app_country_nationality;
//           // this.app_country_id = this.app_country[i].app_country_id;
//         }
//       }
//     }
//     if (this.subscriber.app_subscriber_category_id != null) {
//       for (let i = 0; i < this.dropdown.app_category.length; i++) {
//         if (this.dropdown.app_category[i].app_subscriber_category_id == this.subscriber.app_subscriber_category_id) {
//           this.app_category_1_id = this.dropdown.app_category[i].app_subscriber_category_id;
//           this.app_category_1_name = this.dropdown.app_category[i].app_subscriber_category_name;
//         }
//       }
//     }
//     if (this.subscriber.app_subscriber_category_id2 != null) {
//       for (let i = 0; i < this.dropdown.app_category2.length; i++) {
//         if (this.dropdown.app_category2[i].app_subscriber_category_id === this.subscriber.app_subscriber_category_id2) {
//           this.app_category_2_id = this.dropdown.app_category2[i].app_subscriber_category_id;
//           this.app_category_2_name = this.dropdown.app_category2[i].app_subscriber_category_name;
//         }
//       }
//     }
//     if (this.subscriber.app_subscriber_category_id3 != null) {
//       for (let i = 0; i < this.dropdown.app_category3.length; i++) {
//         if (this.dropdown.app_category3[i].app_subscriber_category_id === this.subscriber.app_subscriber_category_id3) {
//           this.app_category_3_id = this.dropdown.app_category3[i].app_subscriber_category_id;
//           this.app_category_3_name = this.dropdown.app_category3[i].app_subscriber_category_name;
//         }
//       }
//     }
//     if (this.subscriber.app_service_id > 0) {
//       for (let i = 0; i < this.dropdown.app_service.length; i++) {
//         if (this.dropdown.app_service[i].app_service_id === this.subscriber.app_service_id) {
//           this.app_service_id = this.dropdown.app_service[i].app_service_id;
//           this.app_service_id = this.dropdown.app_service[i].app_service_name;
//         }
//       }
//     }
//     if (this.subscriber.app_collector_id > 0) {
//       for (let i = 0; i < this.dropdown.app_collector.length; i++) {
//         if (this.dropdown.app_collector[i].app_collector_id === this.subscriber.app_collector_id) {
//           this.app_collector_id = this.dropdown.app_collector[i].app_collector_id;
//           this.app_collector_id = this.dropdown.app_collector[i].app_collector_name;
//         }
//       }
//     }
//   }
//   reset_poe() {
//     this.subscriber.app_subscriber_poe = null;
//   }
//   changed(ev: any, type: string) {    //if select changed
//     // console.log(ev);
//     if (ev == -999) {
//       if (type === 'addition') {
//         this.clear('addition');
//       } else if (type === 'discount') {
//         this.clear('discount')
//       }
//     } else {
//       if (type === 'service') {
//         for (let i = 0; i < this.dropdown.app_service.length; i++) {
//           if (this.dropdown.app_service[i].app_service_id === ev && this.dropdown.app_service[i].app_service_is_auto_recharge === "1") {
//             this.app_subscriber_auto_recharge = true;
//             this.disable_service = false;
//           } else if (this.dropdown.app_service[i].app_service_id === ev && this.dropdown.app_service[i].app_service_is_auto_recharge === "0") {
//             this.app_subscriber_auto_recharge = false;
//             this.disable_service = true;
//           }
//         }
//       } else if (type === 'discount') {
//         for (let i = 0; i < this.dropdown.app_currency.length; i++) {
//           if (ev === this.dropdown.app_currency[i].app_currency_id) {
//             this.app_subscriber_disc_curr = this.dropdown.app_currency[i].app_currency_code;
//           }
//         }
//       } else if (type === 'addition') {
//         for (let i = 0; i < this.dropdown.app_currency.length; i++) {
//           if (ev === this.dropdown.app_currency[i].app_currency_id) {
//             this.app_subscriber_disc_curr = this.dropdown.app_currency[i].app_currency_code;
//           }
//         }
//       }
//     }
//   }

//   async ngOnInit() {
//     this.poe.push({ name: 'true', title: 'True' });
//     this.poe.push({ name: 'false', title: 'False' });
    
//     this.route.params.subscribe(async params => {

//       this.new_subscriber = await params['new_subscriber'] === 'true' ? true : false;//true or false
//       console.log(this.new_subscriber);
      
//       this.subscriber_id = params['subscriber_id'];

//     })
//     await this.storage.get('data').then((data: any) => {
//       this.data = data
//       this.headers = this.apiService.getHeaders(data.jwt)

//     });
//     await this.getDropDownLists();
//     await this.getAddSubscriber();

//     if (!this.new_subscriber) {
//       await this.getSubscriber();
//       console.log(this.subscriber);
      
//       await this.initData();
//     }
//   }

// }
