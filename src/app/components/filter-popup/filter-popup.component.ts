import { Component,ElementRef,Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss'],
})
export class FilterPopupComponent implements OnInit {
  @ViewChild('name_input', {static: false}) name_input: IonInput

  filters = {
    name : '' ,
    username : '',
    address : '',
    category : '',
    speed : '',
    consumption : '',
    category1: '',
    category2: '',
    service: '',
    balance: '',
    expiry_date: '',
    enabled : false,
    disabled : false,
  }
date: string|number|Date;
  focusIsSet: any;


  showPopup() {
    throw new Error('Method not implemented.');
  }

  constructor() {}
  filter(){
  }
  public ngAfterViewChecked(): void {
    if (!this.focusIsSet) {
      this.name_input.setFocus();
     // Disable focus on setTimeout()
      // Timeout needed for buggy behavior otherwise!
      setTimeout(() => {this.focusIsSet = true; }, 500);
    }
  }
  ngOnInit() {

  }

}

