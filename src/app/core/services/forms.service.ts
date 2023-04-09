import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { getFirestore,collection, addDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  docs: any = [];

  constructor(private auth: AuthService) { }

  async submitForm(form){
    try {
      const formDated = {
        form: form,
        date: new Date()
      }
      const app = initializeApp(environment.firebaseConfig);
      const db = getFirestore(app);
      const user = getAuth(app);
      const docRef = await addDoc(collection(db, user.currentUser.email), formDated);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
