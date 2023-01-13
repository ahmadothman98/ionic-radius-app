import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDealersPage } from './my-dealers.page';

const routes: Routes = [
  {
    path: '',
    component: MyDealersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDealersPageRoutingModule {}
