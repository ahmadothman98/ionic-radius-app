import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {SubscriberModalComponent} from './subscriber-modal/subscriber-modal.component';

@NgModule({ 
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [SubscriberModalComponent],
    exports: [SubscriberModalComponent] 
})
export class ComponentsModule { }