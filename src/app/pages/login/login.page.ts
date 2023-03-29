import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

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

  user = {};

  formErrors = {
    emailError: '',
    passwordError: '',
  };

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  async login() {
    /* try {
      const user = await this.auth.login(this.user.email, this.user.password);
      this.user = user;
      console.log(this.user)
      // update your UI to reflect the logged-in state
    } catch (error) {
      this.errorMessage = error;
      console.log(error);
      // update your UI to show the error message
    } */

    this.auth
      .login(this.userFormData.email, this.userFormData.password)
      .then((userCredentials) => {
        this.user = userCredentials.user;
        console.log(this.user);
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
        }
      });
  }
}
