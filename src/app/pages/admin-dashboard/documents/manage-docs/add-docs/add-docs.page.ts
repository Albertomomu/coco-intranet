import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentsService } from 'src/app/core/services/documents.service';

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.page.html',
  styleUrls: ['./add-docs.page.scss'],
})
export class AddDocsPage implements OnInit {
  userEmail: String;
  uploadDocumentForm: FormGroup;
  selectedFile: File;
  fileName: string = 'Seleccionar archivo';

  constructor(
    private formBuilder: FormBuilder,
    private docService: DocumentsService,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.buildForm();
    this.route.queryParams.subscribe((params) => {
      this.userEmail = params['email'];
    });
  }

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  buildForm() {
    this.uploadDocumentForm = this.formBuilder.group({
      doc: ['', [Validators.required]],
    });
  }

  fileUpload(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    } else {
      this.fileName = 'Seleccionar archivo';
    }
  }

  async submitDoc() {
    if (!this.uploadDocumentForm.valid) {
      this.uploadDocumentForm.markAllAsTouched();
      this.uploadDocumentForm.markAsDirty();
      return;
    }

    this.docService.uploadDocs(this.userEmail, this.fileName, this.selectedFile).then(async () => {
      this.fileName = "Seleccionar archivo";
      this.selectedFile = null;
      const toast = await this.toastController.create({
        message: `Documento añadido`,
        duration: 5000,
        position: 'bottom',
        color: "success"
      });
  
      await toast.present();
    }).catch(async err => {
      const toast = await this.toastController.create({
        message: `Error al añadir el documento`,
        duration: 5000,
        position: 'bottom',
        color: "danger"
      });
  
      await toast.present();
    });
  }
}
