import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  docs: any = [];
  usersList: any = [];

  constructor(private auth: AuthService) {}

  async submitForm(form) {
    try {
      const formDated = {
        form: form,
        date: new Date(),
      };
      const app = initializeApp(environment.firebaseConfig);
      const db = getFirestore(app);
      const user = getAuth(app);
      const docRef = await addDoc(
        collection(db, user.currentUser.email),
        formDated
      );
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async updateUserForm(form, uid) {
    try {
      const app = initializeApp(environment.firebaseConfig);
      const db = getFirestore(app);
      console.log(form);
      const formRef = doc(db, 'users/', uid);
      await updateDoc(formRef, form);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  /*async uploadUserForm(form) {
    console.log(form);
    try {
      const app = initializeApp(environment.firebaseConfig);
      const db = getFirestore(app);
      await addDoc(collection(db, '/users'), form);
      console.log('User saved in firestore: ');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }*/

  async uploadUserForm(form: any, uid) {
    try {
      const auth = getAuth(); // Obtiene el objeto auth de Firebase
      const user = auth.currentUser; // Obtiene el usuario actualmente autenticado
      if (user) {
        const userFormRef = doc(getFirestore(), 'users', uid); // Crea una referencia al documento con el ID del UID del usuario
        await setDoc(userFormRef, form); // Guarda el formulario en Firestore utilizando el ID del UID del usuario
        console.log('El formulario se ha guardado exitosamente');
      } else {
        console.log('No hay ningún usuario autenticado');
      }
    } catch (error) {
      console.error('Ha ocurrido un error al guardar el formulario: ', error);
    }
  }

  async getUsersList() {
    this.usersList = [];
    const usersRef = collection(getFirestore(), 'users');
    const usersSnapshot = await getDocs(usersRef);

    usersSnapshot.forEach((user) => {
      this.usersList.push(user.data());
    });
    return this.usersList;
  }
  async getUser(uid) {
    const userRef = doc(collection(getFirestore(), 'users'), uid);
    const userSnapshot = await getDoc(userRef);

    return userSnapshot.data();
  }
  async deleteUser(uid) {}

  async getUserLogo(email) {
    const storage = getStorage();

    return getDownloadURL(ref(storage, `${email}/logos/${email}`));
  }
}
