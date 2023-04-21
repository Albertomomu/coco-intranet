import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { IUser } from '../../core/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
  }
  async getUser(uid) {
    const db = getFirestore();

    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.user = docSnap.data() as IUser;
      if (this.user.isAdmin == true) {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/inicio']);
      }
    } else {
      console.log('El usuario no existe en la base de datos');
    }
  }
}
