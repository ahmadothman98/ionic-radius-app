import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditSubscriberPageRoutingModule } from './add-edit-subscriber-routing.module';

import { AddEditSubscriberPage } from './add-edit-subscriber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditSubscriberPageRoutingModule
  ],
  declarations: [AddEditSubscriberPage]
})
export class AddEditSubscriberPageModule {}
