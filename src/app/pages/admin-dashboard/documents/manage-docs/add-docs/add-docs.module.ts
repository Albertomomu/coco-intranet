import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDocsPageRoutingModule } from './add-docs-routing.module';

import { AddDocsPage } from './add-docs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddDocsPageRoutingModule
  ],
  declarations: [AddDocsPage]
})
export class AddDocsPageModule {}
