import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  createUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      logo: ['', [Validators.required]],
    });
  }

  submitUser() {
    if (!this.createUserForm.valid) {
      this.createUserForm.markAllAsTouched();
      this.createUserForm.markAsDirty();
      return;
    }

    console.warn(this.createUserForm.value);
    //AQUI VA EL BACKEND
    //this.formsService.submitForm(this.createUserForm.value);
    //this.router.navigate(['/satisfaction-form-success']);
  }
}
