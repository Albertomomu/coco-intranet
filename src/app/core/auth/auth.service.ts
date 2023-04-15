import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(email: string, password: string): Promise<any> {
    const auth = getAuth();
    //const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async signOut(){
    const auth = getAuth();
    return await signOut(auth);
  }
}
