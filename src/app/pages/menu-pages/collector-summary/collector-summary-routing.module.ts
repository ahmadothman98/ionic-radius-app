import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectorSummaryPage } from './collector-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CollectorSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectorSummaryPageRoutingModule {}
