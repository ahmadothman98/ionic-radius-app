import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialManagementPage } from './financial-management.page';

const routes: Routes = [
  {
    path: '',
    component: FinancialManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialManagementPageRoutingModule {}
