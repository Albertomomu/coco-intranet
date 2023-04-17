import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  createUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private formsService: FormsService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      logo: ['', [Validators.required]],
    });
  }

  submitUser() {
    if (!this.createUserForm.valid) {
      this.createUserForm.markAllAsTouched();
      this.createUserForm.markAsDirty();
      return;
    }

    console.warn(this.createUserForm.value.name);
    this.auth.createUser(
      this.createUserForm.value.email,
      this.createUserForm.value.password
    );
    this.formsService.uploadUserForm(this.createUserForm.value);
    //SE CREA EL USUARIO EN AUTH DE FIREBASE, FALTA QUE TAMBIEN SE AÑADA A LA COLECCIÓN
    //this.router.navigate(['/satisfaction-form-success']);
  }
}
