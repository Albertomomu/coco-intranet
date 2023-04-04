import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SatisfactionFormPageRoutingModule } from './satisfaction-form-routing.module';

import { SatisfactionFormPage } from './satisfaction-form.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SatisfactionFormPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SatisfactionFormPage]
})
export class SatisfactionFormPageModule {}
