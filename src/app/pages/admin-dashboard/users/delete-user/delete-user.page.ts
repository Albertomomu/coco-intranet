import { Component, OnInit } from '@angular/core';
import {
  getAuth,
  deleteUser,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {
  usersList: any = [];

  constructor(private formsService: FormsService, private auth: AuthService) {}

  ngOnInit() {
    this.getUsersList();
  }

  async getUsersList() {
    this.usersList = await this.formsService.getUsersList();
  }

  async deleteUser(uid) {
    const auth = getAuth();
    const user = await this.formsService.getUser(uid);

    //Getting user info from firestore, then signing in with email and password for getting the user and delete it from authentication
    signInWithEmailAndPassword(auth, user['email'], user['password'])
      .then((userCredential) => {
        deleteUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
        // ..
      });

    //Also needed to delete the user from firestore and storage logo once the auth is done.
  }
}
