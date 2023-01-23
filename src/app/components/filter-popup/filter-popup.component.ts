import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss'],
})
export class FilterPopupComponent implements OnInit {
  filters = {
    name : '' ,
    username : '',
    address : '',
    category : '',
    speed : '',
    consumption : ''
  }


  showPopup() {
    throw new Error('Method not implemented.');
  }

  constructor() {}
  filter(){
  }
  ngOnInit() {}

}

