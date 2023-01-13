import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainViewPageRoutingModule } from './main-view-routing.module';

import { MainViewPage } from './main-view.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainViewPageRoutingModule,
    NgxPaginationModule,
    ScrollingModule
  ],
  declarations: [MainViewPage],
  providers: [MainViewPage, AppVersion]
})
export class MainViewPageModule {}
