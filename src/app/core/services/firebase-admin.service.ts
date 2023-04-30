import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAdminService {

  admin: any;

  constructor() { }

  initializeAppAdmin() {
    this.admin.initializeApp({
      credential: this.admin.credential.cert(serviceAccount),
      storageBucket: 'coco-intranet.appspot.com'
    });
  }
}
