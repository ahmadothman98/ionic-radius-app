import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { stringify } from 'querystring';
import { OctaPersistentStorage } from 'src/octastorage';
import { AuthService} from '../../auth/auth.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.page.html',
  styleUrls: ['./main-view.page.scss'],
})
export class MainViewPage implements OnInit {
  token : any; user : any;
  storage =  new OctaPersistentStorage('Documents/octastorage');
  data: any;
  selected : string = "ALL"
  selected_condition: string = "all";
  page_no: number = 0;
  user_list: any;
  subscribers_list_title : string = "Subscribers List";

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

  constructor(private route : ActivatedRoute, private auth : AuthService, private router : Router, private utilites : UtilitiesService) { }

  logout(){ 
    this.router.navigate(['/login'], {replaceUrl: true});
    this.auth.logout();
  }

  initData(){
    this.storage.get('data').then((data)=>{
      this.data = data;
      this.getUsers();
      this.get_conditions();
      
    })
  }
  async getUsers(){
    
    let apiData = {    
    "app_dealer_id": this.data.app_dealer_id,
    "user_id": this.data.user_id,
    "group_id": this.data.group_id,
    "app_currency_rate": this.data.app_currency_rate,
    "condition": this.selected_condition,
    "page_no": this.page_no
}

    const options = {
      url: this.data.user_account.server_link + '/api/get_users.php',
      headers: this.utilites.getHeaders(this.data.jwt),
      data: apiData,
    };
    
    const response: HttpResponse = await CapacitorHttp.post(options);
    this.user_list = JSON.parse(response.data).subscriber;

  }

async get_conditions(){
  let apiData = {
    "app_dealer_id": this.data.app_dealer_id,
    "user_id": this.data.user_id,
  }
  
  const options = {
    url: this.data.user_account.server_link + '/api/app_dealer_counters.php',
    headers: this.utilites.getHeaders(this.data.jwt),
    data: apiData,
  };
  const response: HttpResponse = await CapacitorHttp.post(options);
  
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

change_condition(condition : {title:string; condition: string; totals: string; icon: string;}){
  this.selected_condition = condition.condition;
  this.getUsers()
  
}  //
  //
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.token = params['token'];
    
    // const response: HttpResponse = await CapacitorHttp.post(options)
  })
  this.initData();

  // console.log(this.user);

   
  }


}
