import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DocumentsService } from 'src/app/core/services/documents.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.page.html',
  styleUrls: ['./user-profile-view.page.scss'],
})
export class UserProfileViewPage implements OnInit {
  updateUserForm: FormGroup;
  user: any = [];
  fileName: string = 'Cambiar foto';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private docService: DocumentsService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getUser();
  }

  buildForm() {
    this.updateUserForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      isAdmin: [this.user.isAdmin, [Validators.required]],
      logo: [this.user.logo, [Validators.required]],
    });
  }

  async getUser() {
    const uid = this.route.snapshot.paramMap.get('uid');
    const user = await this.usersService.getUser(uid);
    this.user = user;
    await this.getLogo();
    this.buildForm();
  }

  async getLogo() {
    await this.usersService.getUserLogoByEmail(this.user.email).then((url) => {
      this.user.logo = url;
    });
  }

  handleUserLogo(file) {
    console.log(file);
  }

  save() {
    if (!this.updateUserForm.valid) {
      this.updateUserForm.markAllAsTouched();
      this.updateUserForm.markAsDirty();
      return;
    }
    console.warn(this.updateUserForm.value);
    //AQUI VA EL BACKEND
    this.usersService.updateUserForm(this.updateUserForm.value, this.user.uid);
  }

  fileUpload(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    } else {
      this.fileName = 'Cambiar foto';
    }
  }
}
