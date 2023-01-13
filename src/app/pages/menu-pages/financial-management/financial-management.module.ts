import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancialManagementPageRoutingModule } from './financial-management-routing.module';

import { FinancialManagementPage } from './financial-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinancialManagementPageRoutingModule
  ],
  declarations: [FinancialManagementPage]
})
export class FinancialManagementPageModule {}
