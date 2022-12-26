import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  token : any;
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.token = params['token'];
    console.log(this.token);
    })

  }

}
