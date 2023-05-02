import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor() {}

  async login(email: string, password: string): Promise<any> {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async createUser(email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  isAuthenticated(): boolean {
    const auth = getAuth();
    if (auth.currentUser != null) {
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

  async signOut() {
    const auth = getAuth();
    return await signOut(auth);
  }
}
