import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditSubscriberPage } from './add-edit-subscriber.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditSubscriberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditSubscriberPageRoutingModule {}
