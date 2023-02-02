import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberDetailsPageRoutingModule } from './subscriber-details-routing.module';

import { SubscriberDetailsPage } from './subscriber-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberDetailsPageRoutingModule
  ],
  declarations: [SubscriberDetailsPage]
})
export class SubscriberDetailsPageModule {}
