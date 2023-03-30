import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.page.html',
  styleUrls: ['./satisfaction-form.page.scss'],
})
export class SatisfactionFormPage implements OnInit {

  satisfactionFormData = {
    serviceSatisfaction: '',
    expectatives: '',
    clientService: '',
    overallExperience: '',
    recommendation: ''
  }

  constructor() { }

  ngOnInit() {
  }

  submitSatisfaction() {
    console.log(this.satisfactionFormData);
  }

}
