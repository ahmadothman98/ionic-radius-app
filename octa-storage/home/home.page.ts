import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { stringify } from 'querystring';
import { OctaPersistentStorage } from 'src/octastorage';
import { AuthService} from 'src/app//auth/auth.service';
import { UtilitiesService } from 'src/app//services/utilities.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  token : any; user : any; apiData:any;
  storage =  new OctaPersistentStorage('Documents/octastorage');

  data: any;
  condition: string = "all";
  page_no: number = 0;
  user_list: any;
  subscribers_list_title : string = "Subscribers List";

  constructor(private route : ActivatedRoute, private auth : AuthService, private router : Router, private utilites : UtilitiesService) { }

  logout(){ 
    this.router.navigate(['/login'], {replaceUrl: true});
    this.auth.logout();
  }

  initData(){
    this.storage.get('data').then((data)=>{
      this.data = data;

      this.getUsers();
      
    })
  }
  async getUsers(){
    console.log(this.data.dealer_id);
    
    this.apiData = {    
    "app_dealer_id": this.data.app_dealer_id,
    "user_id": this.data.user_id,
    "group_id": this.data.group_id,
    "app_currency_rate": this.data.app_currency_rate,
    "condition": this.condition,
    "page_no": this.page_no
}

    console.log(this.apiData)
    const options = {
      url: this.data.user_account.server_link + '/api/get_users.php',
      headers: this.utilites.getHeaders(this.data.jwt),
      data: this.apiData,
    };
    
    const response: HttpResponse = await CapacitorHttp.post(options);
    console.log(JSON.parse(response.data).subscriber);
    this.user_list = JSON.parse(response.data).subscriber;

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.token = params['token'];
    
    // const response: HttpResponse = await CapacitorHttp.post(options)
  })
  this.initData();

  // console.log(this.user);

   
  }

}
