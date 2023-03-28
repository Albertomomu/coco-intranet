import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.login()
  }

  async login() {
    try {
      console.log('triying')
      const user = await this.auth.login('prueba@cocoglobalmedia.com', 'prueba')
      this.user = user;
      console.log(this.user)
      // update your UI to reflect the logged-in state
    } catch (error) {
      console.error('Login failed:', error);
      // update your UI to show the error message
    }
  }

}
