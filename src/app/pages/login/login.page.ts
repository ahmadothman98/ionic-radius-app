import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar , Style} from '@capacitor/status-bar';
import * as internal from 'stream';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('modal') modal : any;
  account_selected = 'true';
  pass_type = 'password';
  pass_icon = "eye-off";

  servers=[
    {
      id : 1,
      name : 'ALIKNET',
      value : 'ALIKNET_SERVER'
    },
    {
      id : 2,
      name : 'FNS',
      value : 'FNS_SERVER'
    }
  
  ]
  accounts=[
    {
      id: 1,
      username: 'User 1',
      servername: 'Server 1'
    },
    {
      id: 2,
      username: 'User 2',
      servername:'Server 2'
    },
    {
      id: 1,
      username: 'User 1',
      servername: 'Server 1'
    },
    {
      id: 2,
      username: 'User 2',
      servername:'Server 2'
    },{
      id: 1,
      username: 'User 1',
      servername: 'Server 1'
    },
    {
      id: 2,
      username: 'User 2',
      servername:'Server 2'
    },{
      id: 1,
      username: 'User 1',
      servername: 'Server 1'
    },
    {
      id: 2,
      username: 'User 2',
      servername:'Server 2'
    },{
      id: 1,
      username: 'User 1',
      servername: 'Server 1'
    },
    {
      id: 2,
      username: 'User 2',
      servername:'Server 2'
    },
    {
      id: 3,
      username: 'User 3',
      servername:'Server 3'
    }
  ]
  lines(index : number){
    if(index === this.accounts.length-1)
        return "none";
    return "full";
  }
  toggle_password(){ //hide-view
    this.pass_type === 'text' ? (this.pass_type = "password", this.pass_icon = "eye-off") : (this.pass_type = 'text', this.pass_icon = "eye" );
  }

  constructor() { 

  }
  
  ngOnInit() {

    // if(this.modal.isOpen){
      StatusBar.setBackgroundColor({color: '#3fa3a5'});
      StatusBar.setStyle({style: Style.Dark});
    // }

    }

}
