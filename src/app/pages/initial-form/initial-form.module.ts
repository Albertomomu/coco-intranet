import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialFormPageRoutingModule } from './initial-form-routing.module';

import { InitialFormPage } from './initial-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitialFormPageRoutingModule
  ],
  declarations: [InitialFormPage]
})
export class InitialFormPageModule {}
