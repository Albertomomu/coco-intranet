import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/core/services/documents.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {
  doc!: string;

  constructor(private docService: DocumentsService) {}

  ngOnInit() {
    this.getDoc();
  }

  async getDoc() {
    this.doc = await this.docService.getDoc();
    console.log(this.doc);
  }
}
