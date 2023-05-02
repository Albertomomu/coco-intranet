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
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {
  usersList: any = [];
  actualUser: any;

  constructor(private usersService: UsersService, private auth: AuthService) {}

  ngOnInit() {
    this.getUsersList();
    this.actualUser = getAuth().currentUser.uid;
  }

  async getUsersList() {
    this.usersList = await this.usersService.getUsersList();
  }
  async deleteUser(uid) {
    const user = await this.usersService.getUser(uid);

    this.usersService.deleteUser(user['email'], user['password']);

    //Deleting user from firestore
    const db = getFirestore();
    await deleteDoc(doc(db, 'users', uid));

    //Deleting logo from storage
    const storage = getStorage();

    const email = user['email'];

    const logo = ref(storage, `${email}/logos/${email}`);

    deleteObject(logo).then(() => {
      console.log('Logo deleted');
    });
    this.usersList = [];
    this.getUsersList();
    const backUser = await this.usersService.getUser(this.actualUser);
    await signInWithEmailAndPassword(
      getAuth(),
      backUser['email'],
      backUser['password']
    );
  }
}
