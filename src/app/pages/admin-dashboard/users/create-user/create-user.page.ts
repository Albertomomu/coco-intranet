import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DocumentsService } from 'src/app/core/services/documents.service';
import { FormsService } from 'src/app/core/services/forms.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  createUserForm: FormGroup;
  selectedFile: File;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private formsService: FormsService,
    private docService: DocumentsService
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

  submitUser() {
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
      logo: this.createUserForm.value.logo,
      isAdmin: false,
    });
    //this.router.navigate(['/satisfaction-form-success']);
  }
}
