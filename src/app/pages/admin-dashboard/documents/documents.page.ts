import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  usersList: any = [];

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.getUsersList();
  }

  async getUsersList() {
    this.usersList = await this.usersService.getUsersList();
    console.log(this.usersList)
  }

  getUserDocs(userEmail) {
    this.router.navigate(['/admin-dashboard/documents/manage-docs/'], {queryParams: {email: userEmail}});
  }
}
