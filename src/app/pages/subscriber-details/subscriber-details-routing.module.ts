import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberDetailsPage } from './subscriber-details.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberDetailsPageRoutingModule {}
