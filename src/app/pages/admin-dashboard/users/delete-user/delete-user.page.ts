import { Component, OnInit } from '@angular/core';
import {
  getAuth,
  deleteUser,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
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
    console.log(this.usersList);
  }

  async deleteUser(uid) {
    const auth = getAuth();
    const user = await this.formsService.getUser(uid);

    console.log(user);

    //Getting user info from firestore, then signing in with email and password for getting the user and delete it from authentication
    await signInWithEmailAndPassword(auth, user['email'], user['password'])
      .then((userCredential) => {
        deleteUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
        // ..
      });

    //Deleting user from firestore
    const db = getFirestore();
    await deleteDoc(doc(db, 'users', uid));

    //Deleting logo from storage
    const storage = getStorage();

    const email = user['email'];

    const logo = ref(storage, `logos/${email}`);

    deleteObject(logo).then(() => {
      console.log('Logo deleted');
    });
  }
}
