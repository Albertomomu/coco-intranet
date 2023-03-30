import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SatisfactionFormPageRoutingModule } from './satisfaction-form-routing.module';

import { SatisfactionFormPage } from './satisfaction-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SatisfactionFormPageRoutingModule
  ],
  declarations: [SatisfactionFormPage]
})
export class SatisfactionFormPageModule {}
