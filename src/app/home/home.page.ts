import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService} from '../auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  token : any;
  constructor(private route : ActivatedRoute, private auth : AuthService, private router : Router) { }

  logout(){ 
    this.router.navigate(['/login'], {replaceUrl: true});
    this.auth.logout();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.token = params['token'];
    console.log(this.token);
    })

  }

}
