import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DEF } from 'src/providers/definitions/definitions';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
})
export class UserPopupComponent implements OnInit {
  static user_menu() {
    throw new Error('Method not implemented.');
  }

  option_menu : any = [];
  maintainer: any;
  app_subscriber_is_active: number;
  app_subscriber_is_online: number;
  app_subscriber_remain_day: number;
  app_service_refundable: number;
  is_expired: number;
  mac: any;
  pref_lang: string;
  group_privilege: any;
  dealer_view: any;
  subs_of_node: null;
  show_subs_of_node: boolean;
  is_account: string;
  financial_forms: any;
  is_collector: any;
  data: any;
  user: any;

  constructor(private modalCtrl : ModalController,  private storage : StorageService) {
    
    }
  

  
  
  user_operation(user : any, option : any){
    
    
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  async ngOnInit() {
    await this.storage.get('data').then( async (data)=>{
      this.data  = await data;
      this.is_collector = data.app_collector_id;
      this.group_privilege = data.group_privilege[0];
      this.maintainer = data.app_maintainer_id;
      this.dealer_view = false;
    })
    
    
    if (this.maintainer) {
      this.app_subscriber_is_active = parseInt(this.user.app_subscriber_is_active);
      this.app_subscriber_is_online = parseInt(this.user.app_subscriber_is_online);
      this.app_subscriber_remain_day = parseInt(this.user.app_subscriber_remain_day);
      console.log(this.app_subscriber_is_online);
      this.app_service_refundable = parseInt(this.user.app_service_refundable);
      this.is_expired = this.user.is_expired;
      this.mac = this.user.app_subscriber_mac;
      
      this.option_menu.push({ option_name: "financial", option_title: this.pref_lang === "ar" ? DEF.AR_FINANCIAL : DEF.EN_FINANCIAL });
      this.option_menu.push({ option_name: "ticket", option_title: this.pref_lang === "ar" ? DEF.AR_TICKET : DEF.EN_TICKET });
      this.option_menu.push({ option_name: "consumption", option_title: this.pref_lang === "ar" ? DEF.AR_CONSUMPTION : DEF.EN_CONSUMPTION });
      if (this.app_subscriber_is_online == 1 && this.group_privilege.is_disconnect == '1') {
        this.option_menu.push({ option_name: "disconnect", option_title: this.pref_lang === "ar" ? DEF.AR_DISCONNECT : DEF.EN_DISCONNECT });
      }
      if (this.app_subscriber_is_online == 1 && this.group_privilege.is_ping == '1' && this.user.app_subscriber_framed_ip != null) {
        this.option_menu.push({ option_name: "ping", option_title: this.pref_lang === "ar" ? DEF.AR_PING : DEF.EN_PING });
      }
      if (this.mac != null && this.mac != "" && this.group_privilege.is_clear_mac == '1') {
        this.option_menu.push({ option_name: "clear_mac", option_title: this.pref_lang === "ar" ? DEF.AR_CLEAR_MAC : DEF.EN_CLEAR_MAC });
      }
      if (this.app_subscriber_is_active == 1 && this.is_expired == 0 && this.app_service_refundable == 1 && this.group_privilege.is_change_service == 1) {
        this.option_menu.push({ option_name: "change_service", option_title: this.pref_lang === "ar" ? DEF.AR_CHANGE_SERVICE : DEF.EN_CHANGE_SERVICE });
      }
      if (this.app_subscriber_is_active == 1 && this.app_subscriber_remain_day <= 3 && this.group_privilege.is_recharge == 1) {
        this.option_menu.push({ option_name: "recharge", option_title: this.pref_lang === "ar" ? DEF.AR_RECHARGE : DEF.EN_RECHARGE });
      }
      if (this.group_privilege.is_end_session == '1') {
        this.option_menu.push({ option_name: "end_session", option_title: this.pref_lang === "ar" ? DEF.AR_END_SESSION : DEF.EN_END_SESSION });
      }
      if (this.app_subscriber_is_active == 0 && this.group_privilege.is_enable == '1') {
        this.option_menu.push({ option_name: "enable", option_title: this.pref_lang === "ar" ? DEF.AR_ENABLE : DEF.EN_ENABLE });
      }
      if (this.app_subscriber_is_active == 1 && this.group_privilege.is_disable == '1') {
        this.option_menu.push({ option_name: "disable", option_title: this.pref_lang === "ar" ? DEF.AR_DISABLE : DEF.EN_DISABLE });
      }
      if (this.app_subscriber_is_active == 1 && this.group_privilege.is_terminate == '1' && this.is_expired == 0) {
        this.option_menu.push({ option_name: "terminate", option_title: this.pref_lang === "ar" ? DEF.AR_TERMINATE : DEF.EN_TERMINATE });
      }
      if (this.app_subscriber_is_active == 0 && this.is_expired == 1 && this.user.app_subscriber_is_archived == '0' && this.group_privilege.is_archive == '1') {
        this.option_menu.push({ option_name: "archive", option_title: this.pref_lang === "ar" ? DEF.AR_ADD_TO_ARCHIVE : DEF.EN_ADD_TO_ARCHIVE });
      }
    }
     else if (this.dealer_view) {
      this.option_menu.push({ option_name: "financial", option_title: this.pref_lang === "ar" ? DEF.AR_FINANCIAL : DEF.EN_FINANCIAL });
      this.option_menu.push({ option_name: "statement", option_title: this.pref_lang === "ar" ? DEF.AR_STATMENT_OF_ACCOUNT : DEF.EN_STATMENT_OF_ACCOUNT });
      this.option_menu.push({ option_name: "services", option_title: this.pref_lang === "ar" ? DEF.AR_SERVICES : DEF.EN_SERVICES });
      this.option_menu.push({ option_name: "whatsapp", option_title: this.pref_lang === "ar" ? DEF.AR_WHATSAPP : DEF.EN_WHATSAPP });
    } else if (this.subs_of_node != null || this.subs_of_node != undefined) {
      this.show_subs_of_node = true;
    } else {
      this.app_subscriber_is_active = parseInt(this.user.app_subscriber_is_active);
      this.app_subscriber_is_online = parseInt(this.user.app_subscriber_is_online);
      this.app_subscriber_remain_day = parseInt(this.user.app_subscriber_remain_day);
      this.app_service_refundable = parseInt(this.user.app_service_refundable);
      this.is_expired = this.user.is_expired;
      this.mac = this.user.app_subscriber_mac;

      if (this.data.is_account == '1' && this.data.financial_forms.show_finance) {
        this.option_menu.push({ option_name: "financial", option_title: this.pref_lang === "ar" ? DEF.AR_FINANCIAL : DEF.EN_FINANCIAL });
      }
      if (this.is_collector) {
        this.option_menu.push({ option_name: "visit", option_title: this.pref_lang === "ar" ? DEF.AR_VISIT : DEF.EN_VISIT });
        this.option_menu.push({ option_name: "reminder", option_title: this.pref_lang === "ar" ? DEF.AR_REMINDER : DEF.EN_REMINDER });
        this.option_menu.push({ option_name: "node_subs", option_title: this.pref_lang === "ar" ? DEF.AR_SHOW_NEIGHBORS : DEF.EN_SHOW_NEIGHBORS });
      }
      if (this.is_expired == 0 && this.user.is_service_monthly == '1' && this.group_privilege.is_add_extra_g == '1') {
        this.option_menu.push({ option_name: "extra_giga", option_title: this.pref_lang === "ar" ? DEF.AR_EXTRA_GIGA : DEF.EN_EXTRA_GIGA });
      }
      if (this.app_subscriber_is_online == 1 && this.group_privilege.is_disconnect == '1') {
        this.option_menu.push({ option_name: "disconnect", option_title: this.pref_lang === "ar" ? DEF.AR_DISCONNECT : DEF.EN_DISCONNECT });
      }
      if (this.app_subscriber_is_online == 1 && this.group_privilege.is_ping == '1' && this.user.app_subscriber_framed_ip != null) {
        this.option_menu.push({ option_name: "ping", option_title: this.pref_lang === "ar" ? DEF.AR_PING : DEF.EN_PING });
      }
      if (this.mac != null && this.mac != "" && this.group_privilege.is_clear_mac == '1') {
        this.option_menu.push({ option_name: "clear_mac", option_title: this.pref_lang === "ar" ? DEF.AR_CLEAR_MAC : DEF.EN_CLEAR_MAC });
      }
      if (this.app_subscriber_is_active == 1 && this.is_expired == 0 && this.app_service_refundable == 1 && this.group_privilege.is_change_service == '1') {
        this.option_menu.push({ option_name: "change_service", option_title: this.pref_lang === "ar" ? DEF.AR_CHANGE_SERVICE : DEF.EN_CHANGE_SERVICE });
      }
      if (this.app_subscriber_is_active == 1 && this.app_subscriber_remain_day <= 3 && this.group_privilege.is_recharge == '1') {
        this.option_menu.push({ option_name: "recharge", option_title: this.pref_lang === "ar" ? DEF.AR_RECHARGE : DEF.EN_RECHARGE });
      }
      if (this.group_privilege.is_end_session == '1') {
        this.option_menu.push({ option_name: "end_session", option_title: this.pref_lang === "ar" ? DEF.AR_END_SESSION : DEF.EN_END_SESSION });
      }
      if (this.app_subscriber_is_active == 0 && this.group_privilege.is_enable == '1') {
        this.option_menu.push({ option_name: "enable", option_title: this.pref_lang === "ar" ? DEF.AR_ENABLE : DEF.EN_ENABLE });
      }
      if (this.app_subscriber_is_active == 1 && this.group_privilege.is_disable == '1') {
        this.option_menu.push({ option_name: "disable", option_title: this.pref_lang === "ar" ? DEF.EN_DISABLE : DEF.EN_DISABLE });
      }
      if (this.app_subscriber_is_active == 1 && this.group_privilege.is_terminate == '1' && this.is_expired == 0) {
        this.option_menu.push({ option_name: "terminate", option_title: this.pref_lang === "ar" ? DEF.EN_TERMINATE : DEF.EN_TERMINATE });
      }
      if (this.app_subscriber_is_active == 0 && this.is_expired == 1 && this.user.app_subscriber_is_archived == '0' && this.group_privilege.is_archive == '1') {
        this.option_menu.push({ option_name: "archive", option_title: this.pref_lang === "ar" ? DEF.AR_ADD_TO_ARCHIVE : DEF.EN_ADD_TO_ARCHIVE });
      }
      this.option_menu.push({ option_name: "statement", option_title: this.pref_lang === "ar" ? DEF.AR_STATMENT_OF_ACCOUNT : DEF.EN_STATMENT_OF_ACCOUNT });
      this.option_menu.push({ option_name: "ticket", option_title: this.pref_lang === "ar" ? DEF.AR_TICKET : DEF.EN_TICKET });
      this.option_menu.push({ option_name: "consumption", option_title: this.pref_lang === "ar" ? DEF.AR_CONSUMPTION : DEF.EN_CONSUMPTION });
      this.option_menu.push({ option_name: "directions", option_title: this.pref_lang === "ar" ? DEF.AR_DIRECTIONS : DEF.EN_DIRECTIONS });
      this.option_menu.push({ option_name: "whatsapp", option_title: this.pref_lang === "ar" ? DEF.AR_WHATSAPP : DEF.EN_WHATSAPP });
      }
  }


}
