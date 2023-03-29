import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {

    const app = initializeApp(environment.firebaseConfig);
    const auth = getAuth(app);
    const user = auth.currentUser
    console.log(user);
    
  }

    logout() {
      this.auth.signOut();
      this.router.navigate(["/home"]);
    }

}
