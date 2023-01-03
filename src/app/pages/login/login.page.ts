import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar , Style} from '@capacitor/status-bar';
import { AlertController } from '@ionic/angular';
import { CapacitorConfig } from '@capacitor/cli';
import { OctaPersistentStorage } from 'src/octastorage';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild('modal') modal : any;
  config: CapacitorConfig = {
    plugins: {
      Keyboard: {
        resizeOnFullScreen: true,
      },
    },
  };
  pass_type = 'password';
  pass_icon = "eye-off";
  username : string = '';
  selected_server : any;
  server_index : number = -1 ;
  password  : string = '';
  user : any;
  headers :any;
  res : any;
  login_data : any;
  login_api : any;
  accounts : any ;

  servers_api : any;
  servers : any =  [];

  modal_title : string = 'Add Account';

  storage =  new OctaPersistentStorage('Documents/octastorage');
  role: string = 'add';

  edit_account_index : number = -1;
  responseData: any;
  app_version: any;
  pref_lang: any;
  last_server: any;
  constructor(private router: Router, private alertController : AlertController, private http : HttpClient, private utilites: UtilitiesService    ) {}


  //methods

  lines(index : number){
    if(index === this.accounts.length-1)
        return "none";
    return "full";
  }
  toggle_password(){ //hide-view
    this.pass_type === 'text' ? (this.pass_type = "password", this.pass_icon = "eye-off") : (this.pass_type = 'text', this.pass_icon = "eye" );
  }
 

  async login(index : any){

    this.initLoginData(index);

      const options = {
        url: this.login_api,
        headers: this.headers,
        data: this.login_data,
      };
      const response: HttpResponse = await CapacitorHttp.post(options)
      let status = response.status;
      let mystatus = response.data.myStatus;
      
      if(status === 401 && mystatus === "Unauthorized"){
        const alert = await this.alertController.create(
          {
            header: response.data.msg,
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
              
              }
            ]
          }
        )
        await alert.present();
      }
      else if(status === 200 && mystatus === "Ok"){
        this.responseData = response.data;
        console.log(this.responseData);
        Object.assign(this.responseData,{'jwt': (response.headers['Authorization'] ? response.headers['Authorization'] : (response.headers['authorization'] ? response.headers['authorization'] : '' ))});
        Object.assign(this.responseData,{'user_account': this.user});
        console.log(response );
      
        console.log(response.headers);
      this.storage.set("data", this.responseData).then(()=>{
        
        this.router.navigate(['/main-view'], {replaceUrl: true});
      })
    }
  }

  submitAccount( ){ 
    this.selected_server = this.servers[this.server_index]
    if(this.selected_server && this.username && this.password){
      var new_account = {
        server_title: this.selected_server.app_server_link_title,
        server_link : this.selected_server.app_server_link_ip,
        username : this.username,
        password : this.password,
      } 
      
    if(this.role === "add"){
        this.storage.get('accounts').then((accounts) =>{
        var new_accounts = accounts ? accounts : [];
          new_accounts.push(new_account);

          this.accounts = new_accounts;
          this.storage.set('accounts',new_accounts).then(() => {
            this.modal.dismiss();
          })
        })
      }
      
      else if(this.role === "edit"){
        this.accounts.splice(this.edit_account_index,1,new_account);
        this.storage.set('accounts',this.accounts).then(() => {
          this.modal.dismiss();
        })
      }
    }
  }

  //
  async removeAccount(index: number, account_slide_item : any){
    const alert = await this.alertController.create(
      {
        header: 'Remove ' + this.accounts[index].username + '?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          
          },
          {
            text: 'Remove',
            role: 'confirm',
          }
        ]
      }
    )
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role === 'confirm'){
      this.storage.get('accounts').then((accounts) =>{
        accounts.splice(index,1);
        this.storage.set('accounts',accounts);
        this.accounts = accounts;
      })
    }

   
    if(role === 'cancel' || role === 'backdrop'){
      account_slide_item.close();
    }

  }

  editAccount(index: number){
    this.modal_title = 'Edit Account';
    this.role = 'edit';
    this.edit_account_index = index;
    this.username = this.accounts[index].username;
    this.password = this.accounts[index].password;
    this.selected_server = {
      server_title : this.accounts[index].server_title,
      server_link : this.accounts[index].server_link
    };
    //@ts-ignore
    this.server_index = this.servers.findIndex(object => {
      return object.app_server_link_title === this.accounts[index].server_title;
    });
      

    this.modal.present();    


  }
  
  didDismiss(){
    this.username = '';
    this.password = '';
    this.selected_server = null;
    this.role = 'add';
    this.modal_title = 'Add Account';
    this.server_index = -1;

  }
  //@ts-ignore
  initLoginData(index){
    this.user = this.accounts[index];
    this.login_api = this.user.server_link + '/api/login.php';
    this.login_data = {
      username : this.user.username,
      password : this.user.password,
      // device_id: '',
      // app_version: '',
      // device_os: '', 
    };
  }

  initServerList(){
    let url = 'https://octaradius.com/octaradius/api/get_server_list.php';
    let data = {};
    this.http.post(url, data, this.headers).subscribe((res : any) => {
      this.servers = res.server_list;
    })
     
  }

  ngOnInit() {
    this.headers = this.utilites.getHeaders();

    this.initServerList();
    this.storage.get('accounts').then((accounts)=>{
      
      this.accounts = accounts;
    })
  }
  
}
