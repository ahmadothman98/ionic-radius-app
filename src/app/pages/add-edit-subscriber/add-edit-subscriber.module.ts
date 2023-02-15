import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlDirective, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditSubscriberPageRoutingModule } from './add-edit-subscriber-routing.module';

import { AddEditSubscriberPage } from './add-edit-subscriber.page';

import { Ng2CompleterModule } from "ng2-completer";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditSubscriberPageRoutingModule,
    Ng2CompleterModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [AddEditSubscriberPage],
})
export class AddEditSubscriberPageModule {}
