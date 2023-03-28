import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(email: string, password: string): Promise<any> {

    const auth = getAuth();
    const signInObservable = from(signInWithEmailAndPassword(auth, email, password));

    return new Promise((resolve, reject) => {
      signInObservable.subscribe(
        (userCredential) => {
          // Signed in
          resolve(userCredential.user);
        },
        (error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          reject(error);
        }
      );
    });
    /*signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      this.user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });*/
  }



}
