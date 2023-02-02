import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './guards/auth/auth.service'
import { AuthGuard } from './guards/auth/auth.guard'
import {LoginGuard} from './guards/login/login.guard'

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canLoad: [LoginGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canLoad: [LoginGuard],
    

  },

  {
    path: 'main-view',
    loadChildren: () => import('./pages/main-view/main-view.module').then(m => m.MainViewPageModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'my-services',
    loadChildren: () => import('./pages/menu-pages/my-services/my-services.module').then( m => m.MyServicesPageModule)
  },
  {
    path: 'financial-management',
    loadChildren: () => import('./pages/menu-pages/financial-management/financial-management.module').then( m => m.FinancialManagementPageModule)
  },
  {
    path: 'recharge',
    loadChildren: () => import('./pages/menu-pages/recharge/recharge.module').then( m => m.RechargePageModule)
  },
  {
    path: 'collector-summary',
    loadChildren: () => import('./pages/menu-pages/collector-summary/collector-summary.module').then( m => m.CollectorSummaryPageModule)
  },
  {
    path: 'my-dealers',
    loadChildren: () => import('./pages/menu-pages/my-dealers/my-dealers.module').then( m => m.MyDealersPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/menu-pages/category/category.module').then( m => m.CategoryPageModule)
  },

  {
    path: 'subscriber-details',
    loadChildren: () => import('./pages/subscriber-details/subscriber-details.module').then( m => m.SubscriberDetailsPageModule)
  },
  {
    path: 'add-edit-subscriber',
    loadChildren: () => import('./pages/add-edit-subscriber/add-edit-subscriber.module').then( m => m.AddEditSubscriberPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard, LoginGuard]
})
export class AppRoutingModule { }
