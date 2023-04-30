import { Component } from '@angular/core';
import { FcmService } from './core/services/fcm.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fcmService: FcmService, private platform: Platform) {
    this.itializeApp()
  }

  itializeApp() {
    this.platform.ready().then(() => {
      this.fcmService.initPush();
    })
  }
}
