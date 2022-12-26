import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar , Style} from '@capacitor/status-bar';
import { Storage } from '@ionic/storage'
import { AlertController } from '@ionic/angular';
import { CapacitorConfig } from '@capacitor/cli';
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
  account_selected = 'true';
  pass_type = 'password';
  pass_icon = "eye-off";
  username : any;
  servername : any;
  password : any;
  token : any;
  servers=[
    {
      id : 1,
      name : 'ALIKNET',
    },
    {
      id : 2,
      name : 'FNS',
    }
  
  ]
  accounts : any ;


  constructor(private router: Router, public storage : Storage, private alertController : AlertController) {
    this.storage.create();
    this.storage.get('accounts').then((acnts)=>{
      this.accounts = acnts;
    })

  }


  //methods

  lines(index : number){
    if(index === this.accounts.length-1)
        return "none";
    return "full";
  }
  toggle_password(){ //hide-view
    this.pass_type === 'text' ? (this.pass_type = "password", this.pass_icon = "eye-off") : (this.pass_type = 'text', this.pass_icon = "eye" );
  }
 

  login(index : any){
    var user = this.accounts[index];
     if(user.username === "User2" && user.password === "Pass2" && user.servername === "ALIKNET"){
       this.router.navigate(['/home']);
     }
  }
  addAccount(){
    if(this.servername && this.username && this.password){
      var new_account = {
        servername : this.servername,
        username : this.username,
        password : this.password,
      } 
      
      this.storage.get('accounts').then((accounts) =>{
       var new_accounts ;
        if(accounts){
          new_accounts = accounts;
        }
        else{
          new_accounts = [];
        }

        new_accounts.push(new_account);

        this.accounts = new_accounts;
        this.storage.set('accounts',new_accounts).then(() => {
                this.modal.dismiss();
            })
      })
      console.log(this.username);
      console.log(this.password);
    }
  }
  async removeAccount(index: number, account : any){
    const alert = await this.alertController.create(
      {
        header: 'Remove Account?',
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
    console.log(role);
    if(role === 'confirm'){
      this.storage.get('accounts').then((accounts) =>{
        accounts.splice(index,1);
        this.storage.set('accounts',accounts);
        this.accounts = accounts;
      })
    }

   
    if(role === 'cancel' || role === 'backdrop'){
      account.close();
    }

  }
  ngOnInit() {


    }

}
