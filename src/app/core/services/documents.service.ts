import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { setDoc, doc, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  docs: any = [];

  constructor(private auth: AuthService) {}

  async getDocs(): Promise<any> {
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
    const email = auth.currentUser?.email;
    this.docs = [];
    const storage = getStorage();
    if (email) {
      const docRef = ref(storage, `${email}/documents`);
      return await listAll(docRef);
    }
  }

  async uploadLogo(email, document): Promise<any> {
    const storage = getStorage();
    const storageRef = ref(storage, `${email}/logos/${email}`);

    uploadBytes(storageRef, document).then((snapshot) => {
      console.log('Uploaded');
    });
  }
}
