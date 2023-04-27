import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getStorage,
  ref,
  listAll,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

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

  async getDoc() {
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
    const email = auth.currentUser?.email;
    const storage = getStorage(app);

    if (email) {
      const fileRef = ref(storage, `${email}/budget/budget.pdf`);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } else {
      return 'Error';
    }
  }

  async uploadDocs(email, fileName, document): Promise<any> {
    const storage = getStorage();
    const storageRef = ref(storage, `${email}/documents/${fileName}`);

    uploadBytes(storageRef, document).then((snapshot) => {
      console.log('Uploaded');
    });
  }

  async getDocsByEmail(email): Promise<any> {
    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
    this.docs = [];
    const storage = getStorage();
    if (email) {
      const docRef = ref(storage, `${email}/documents`);
      return await listAll(docRef);
    }
  }

  async deleteDoc(url) {
    const storage = getStorage();
    const storageRef = ref(storage, url);
    console.log(url);

    return deleteObject(storageRef);
  }
}
