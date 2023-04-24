import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  usersList: any = [];

  constructor(private usersService: UsersService, private auth: AuthService) {}

  ngOnInit() {
    this.getUsersList();
  }

  async getUsersList() {
    this.usersList = await this.usersService.getUsersList();
  }

  async editUser(uid) {}
}
