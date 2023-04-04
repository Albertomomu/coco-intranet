import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.page.html',
  styleUrls: ['./satisfaction-form.page.scss'],
})
export class SatisfactionFormPage implements OnInit {
  satisfactionForm: FormGroup;

  get expectatives() {
    return this.satisfactionForm.get("expectatives");
  }

  get overallExperience() {
    return this.satisfactionForm.get("overallExperience");
  }

  constructor(private formBuilder: FormBuilder) {
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
    console.log('asdasd');
  }
}
