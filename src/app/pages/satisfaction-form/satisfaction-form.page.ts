import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.page.html',
  styleUrls: ['./satisfaction-form.page.scss'],
})
export class SatisfactionFormPage implements OnInit {
  satisfactionForm: FormGroup;

  get expectatives() {
    return this.satisfactionForm.get('expectatives');
  }

  get overallExperience() {
    return this.satisfactionForm.get('overallExperience');
  }

  get recommendation() {
    return this.satisfactionForm.get('recommendation');
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
      serviceSatisfaction: [0, [Validators.required]],
      expectatives: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      clientService: [0, [Validators.required]],
      recommendation: ['', [Validators.required]],
      overallExperience: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  submitSatisfaction() {
    if (!this.satisfactionForm.valid) {
      this.satisfactionForm.markAllAsTouched();
      this.satisfactionForm.markAsDirty();
      return;
    }

    console.warn(this.satisfactionForm.value);
    //AQUI VA EL BACKEND
    this.usersService.submitForm(this.satisfactionForm.value);
    this.router.navigate(['/satisfaction-form-success']);
  }
}
