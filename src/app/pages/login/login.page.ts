import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { IUser } from '../../core/interfaces/user';
import admin from '../../serviceAccount/firebase-admin.js';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  const 
  userFormData = {
    email: '',
    password: '',
  };

  user: IUser;

  formErrors = {
    emailError: '',
    passwordError: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  async login() {
    this.auth
      .login(this.userFormData.email, this.userFormData.password)
      .then((userCredentials) => {
        console.log(userCredentials);
        this.getUser(userCredentials.user.uid);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.formErrors.passwordError = '';
            this.formErrors.emailError = 'Email inválido';
            break;

          case 'auth/wrong-password':
            this.formErrors.emailError = '';
            this.formErrors.passwordError = 'Contraseña inválida';
            break;

          case 'auth/internal-error':
            this.formErrors.emailError = '';
            this.formErrors.passwordError = 'Contraseña inválida';
            break;

          case 'auth/user-not-found':
            this.formErrors.passwordError = '';
            this.formErrors.emailError = 'Email inválido';
            break;
        }
      });

    /* let tupac = await getAuth().currentUser.getIdTokenResult();
      console.log(tupac) */
  }
  async getUser(uid) {
    const db = getFirestore();

    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = docSnap.data() as IUser;
      if (this.user.isAdmin == true) {
        const auth = getAuth();
        const user = await auth.currentUser.getIdTokenResult().then((t) => {
          console.log(t.claims)
        });

        /* auth.setCustomUserClaims(user.uid, { role: 'admin' })
          .then(() => {
            console.log(
              'Claim personalizado establecido para el usuario',
              user.uid
            );
          })
          .catch((error) => {
            console.log('Error al establecer el claim personalizado', error);
          }); */

        this.router.navigate(['/admin-dashboard']);
      } else {
        if (this.user.isInitialForm) {
          this.router.navigate(['/inicio']);
        } else {
          this.router.navigate(['/initial-form']);
        }
      }
    } else {
      console.log('El usuario no existe en la base de datos');
    }
  }
}
