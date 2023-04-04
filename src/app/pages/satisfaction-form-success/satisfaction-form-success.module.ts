import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SatisfactionFormSuccessPageRoutingModule } from './satisfaction-form-success-routing.module';

import { SatisfactionFormSuccessPage } from './satisfaction-form-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SatisfactionFormSuccessPageRoutingModule
  ],
  declarations: [SatisfactionFormSuccessPage]
})
export class SatisfactionFormSuccessPageModule {}
