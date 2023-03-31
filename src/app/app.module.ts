import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import {File} from '@awesome-cordova-plugins/file/ngx'
import {DocumentViewer} from '@awesome-cordova-plugins/document-viewer/ngx'
import {FileTransfer} from '@awesome-cordova-plugins/file-transfer/ngx'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              File,
              FileTransfer,
              DocumentViewer
              ],
  bootstrap: [AppComponent],
})
export class AppModule {}
