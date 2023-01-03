import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService} from '../../auth/auth.service';
import { ApiService } from '../../services/api/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.page.html',
  styleUrls: ['./main-view.page.scss'],
})
export class MainViewPage implements OnInit {
  token : any; user : any;
  data: any;
  selected : string = "ALL"
  selected_condition: string = "all";
  page_no: number = 0;
  user_list: any;
  subscribers_list_title : string = "Subscribers List";
  loading : any;
  headers : any;
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

  constructor(private route : ActivatedRoute, private auth : AuthService, private router : Router, private apiService : ApiService, private loadingCtrl: LoadingController, private storage : StorageService) {

   }

  logout(){ 
    this.router.navigate(['/login'], {replaceUrl: true});
    this.auth.logout();
    // this.storage.clear();
  }

  async initData(){
    await this.storage.get('data').then((data)=>{
      this.data = data; 
      this.headers = this.apiService.getHeaders(data.jwt)}).then(()=>{
      this.getUsers();
      this.get_conditions();
    })
    return this.data;
  }
  async getUsers(){
    
    let url = this.data.user_account.server_link + '/api/get_users.php';

    let apiData = {    
    "app_dealer_id": this.data.app_dealer_id,
    "user_id": this.data.user_id,
    "group_id": this.data.group_id,
    "app_currency_rate": this.data.app_currency_rate,
    "condition": this.selected_condition,
    "page_no": this.page_no
    }

    const response =  await this.apiService.post(url,this.headers,apiData);
    this.user_list = JSON.parse(response.data).subscriber;

  }

async get_conditions(){
  let url =this.data.user_account.server_link + '/api/app_dealer_counters.php';
  let apiData = {
    "app_dealer_id": this.data.app_dealer_id,
    "user_id": this.data.user_id,
  }
  const response =  await this.apiService.post(url,this.headers,apiData);
  
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
  this.user_list = [];
  this.selected_condition = condition.condition;
  this.start_loading().then(() => {
    this.getUsers().then(()=>{
      this.stop_loading();
    });
  });
  
}

async start_loading(){
  this.loading = await this.loadingCtrl.create({
    message: 'Getting Data',
  });
  this.loading.present();
}
async stop_loading(){
  this.loading.dismiss();
}


  //
  //
  ngOnInit() {
    this.start_loading().then(() =>{
      this.initData().then((data)=>{
        this.stop_loading();
      });
    });

    this.route.params.subscribe(params => {
      this.token = params['token'];
      })
  


   
  }


}


