import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectorSummaryPageRoutingModule } from './collector-summary-routing.module';

import { CollectorSummaryPage } from './collector-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectorSummaryPageRoutingModule
  ],
  declarations: [CollectorSummaryPage]
})
export class CollectorSummaryPageModule {}
