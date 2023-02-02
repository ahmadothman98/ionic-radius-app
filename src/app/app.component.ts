import { Component , OnInit} from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
StatusBar
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    StatusBar.setStyle({ style: Style.Dark })
    StatusBar.setBackgroundColor({color: '#30A7AA'})
  }
}
