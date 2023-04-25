import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.page.html',
  styleUrls: ['./initial-form.page.scss'],
})
export class InitialFormPage implements OnInit {
  satisfactionForm: FormGroup;

  get objectives() {
    return this.satisfactionForm.get('objectives');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    this.satisfactionForm = this.formBuilder.group({
      facebookEmail: ['', [Validators.required]],
      facebookPassword: ['', [Validators.required]],
      instagramEmail: ['', [Validators.required]],
      instagramPassword: ['', [Validators.required]],
      googleEmail: ['', [Validators.required]],
      googlePassword: ['', [Validators.required]],
      objectives: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
    });
  }

  async submitSatisfaction() {
    console.log(this.satisfactionForm.value);
    if (!this.satisfactionForm.valid) {
      this.satisfactionForm.markAllAsTouched();
      this.satisfactionForm.markAsDirty();
      return;
    }

    console.warn(this.satisfactionForm.value);
    //AQUI VA EL BACKEND
    await this.usersService.uploadUserInitFOrm(this.satisfactionForm.value);
    this.router.navigate(['/satisfaction-form-success']);
  }
}
