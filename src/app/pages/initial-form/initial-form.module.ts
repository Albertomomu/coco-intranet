import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialFormPageRoutingModule } from './initial-form-routing.module';

import { InitialFormPage } from './initial-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InitialFormPageRoutingModule,
  ],
  declarations: [InitialFormPage],
})
export class InitialFormPageModule {}
