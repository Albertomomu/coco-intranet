import { Injectable } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import {
  PushNotifications,
  Token,
  ActionPerformed,
  PushNotificationSchema,
} from '@capacitor/push-notifications'

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor() {}

  public initPush() {
    if (Capacitor.getPlatform() !== 'web') {
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive == "granted") {
        PushNotifications.register()
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('My token: ' + JSON.stringify(token));
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      console.log('Notification: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', async (notification: ActionPerformed) => {
      console.log('Action performed: ' + JSON.stringify(notification.notification));
    });
  }
}
