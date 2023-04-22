import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {
  usersList: any = [];

  constructor(private formsService: FormsService) {}

  ngOnInit() {
    this.getUsersList();
  }

  async getUsersList() {
    this.usersList = await this.formsService.getUsersList();
  }

  async deleteUser(uid) {
    this.formsService.deleteUser(uid);
  }
}
