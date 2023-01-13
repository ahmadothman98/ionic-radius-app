import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDealersPageRoutingModule } from './my-dealers-routing.module';

import { MyDealersPage } from './my-dealers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDealersPageRoutingModule
  ],
  declarations: [MyDealersPage]
})
export class MyDealersPageModule {}
