import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteDocsPageRoutingModule } from './delete-docs-routing.module';

import { DeleteDocsPage } from './delete-docs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteDocsPageRoutingModule
  ],
  declarations: [DeleteDocsPage]
})
export class DeleteDocsPageModule {}
