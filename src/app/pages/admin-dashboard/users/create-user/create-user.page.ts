import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  createUserForm: FormGroup;
  selectedFile: File;
  fileName: string = 'Seleccionar archivo';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  buildForm() {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      logo: ['', [Validators.required]],
    });
  }

  fileUpload(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    } else {
      this.fileName = 'Seleccionar archivo';
    }
  }

  /*submitUser() {
    if (!this.createUserForm.valid) {
      this.createUserForm.markAllAsTouched();
      this.createUserForm.markAsDirty();
      return;
    }

    console.warn(this.createUserForm);
    this.auth.createUser(
      this.createUserForm.value.email,
      this.createUserForm.value.password
    );
    this.docService.uploadDoc(
      this.createUserForm.value.email,
      this.selectedFile
    );
    this.formsService.uploadUserForm({
      name: this.createUserForm.value.name,
      email: this.createUserForm.value.email,
      isAdmin: false,
    });
    //this.router.navigate(['/satisfaction-form-success']);
  }*/
  async submitUser() {
    if (!this.createUserForm.valid) {
      this.createUserForm.markAllAsTouched();
      this.createUserForm.markAsDirty();
      return;
    }

    console.warn(this.createUserForm);

    try {
      const userCredential = await this.auth.createUser(
        this.createUserForm.value.email,
        this.createUserForm.value.password
      );
      await this.usersService.uploadLogo(
        this.createUserForm.value.email,
        this.selectedFile
      );
      await this.usersService.uploadUserForm(
        {
          name: this.createUserForm.value.name,
          email: this.createUserForm.value.email,
          password: this.createUserForm.value.password,
          uid: userCredential.user.uid,
          isAdmin: false,
        },
        userCredential.user.uid
      );
      console.log('Todas las funciones han salido exitosas');
      this.router.navigate(['/admin-dashboard']);
    } catch (error) {
      console.error('Ha ocurrido un error: ', error);
    }
  }
}
