import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.page.html',
  styleUrls: ['./user-profile-view.page.scss'],
})
export class UserProfileViewPage implements OnInit {
  user: any = [];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
    console.log(this.user);
  }

  async getUser() {
    const uid = this.route.snapshot.paramMap.get('uid');
    const user = await this.usersService.getUser(uid);
    this.user = user;
    this.getLogo();
  }

  async getLogo() {
    await this.usersService.getUserLogo(this.user.email).then((url) => {
      this.user.logo = url;
    });
  }

  save() {}
}
