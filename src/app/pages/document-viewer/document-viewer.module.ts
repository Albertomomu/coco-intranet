import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentViewerPageRoutingModule } from './document-viewer-routing.module';

import { DocumentViewerPage } from './document-viewer.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentViewerPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [DocumentViewerPage]
})
export class DocumentViewerPageModule {}
