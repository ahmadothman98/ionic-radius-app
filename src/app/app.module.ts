import { NgModule , OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from './guards/auth/auth.service'
import { AuthGuard } from './guards/auth/autfh.guard'
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AppVersion } from '@ionic-native/app-version';
import { LoginGuard } from './guards/login/login.guard';
import { UserPopupComponent } from './components/user-popup/user-popup.component';

@NgModule({
  declarations: [AppComponent, UserPopupComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  IonicStorageModule.forRoot(), NgxPaginationModule, FormsModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent],

})
export class AppModule {


}
