import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL } from 'firebase/storage';
import { Filesystem, Directory, GetUriOptions } from '@capacitor/filesystem';
import { ToastController } from '@ionic/angular';
import { Http } from '@capacitor-community/http';
import { DocumentsService } from 'src/app/core/services/documents.service';

@Component({
  selector: 'app-delete-docs',
  templateUrl: './delete-docs.page.html',
  styleUrls: ['./delete-docs.page.scss'],
})
export class DeleteDocsPage implements OnInit {
  userEmail: String;
  docsList: any[] = [];
  docsListFormatted: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private docs: DocumentsService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userEmail = params['email'];
    });

    this.getDocs();
  }

  openDocument(documentUrl: string): void {
    this.router.navigate(['/document-viewer', documentUrl]);
  }

  getDocs() {
    this.docs.getDocsByEmail(this.userEmail).then(async (responseList) => {
      for (const item of responseList.items) {
        const name = item.name;
        const url = await getDownloadURL(item);
        this.docsList.push({ name, url });
      }
      this.docsList.map((doc) => {
        let visibility = false;
        if (doc.name.endsWith('.pdf')) {
          visibility = true;
        }
        const docFormatted = {
          name: doc.name,
          url: doc.url,
          visibility,
        };
        this.docsListFormatted.push(docFormatted);
      });
      console.log(this.docsListFormatted);
    });
  }

  async checkFileExists(getUriOptions: GetUriOptions): Promise<boolean> {
    try {
      await Filesystem.stat(getUriOptions);
      return true;
    } catch (checkDirException) {
      if (checkDirException.message === 'File does not exist') {
        return false;
      } else {
        throw checkDirException;
      }
    }
  }

  async downloadFile1(documentUrl: string, documentName: string) {
    try {
      // Crear el directorio si no existe
      const directoryPath = `${Directory.Documents}/CocoGlobalMedia`;
      const checkDirectoryExists = await this.checkFileExists({
        path: directoryPath,
        directory: Directory.Documents,
      });
      if (!checkDirectoryExists) {
        await Filesystem.mkdir({
          path: directoryPath,
          directory: Directory.Documents,
          recursive: true, // crea directorios anidados si no existen
        });
      }
      // Descargar el archivo
      const filePath = `${directoryPath}/${documentName}`;
      await Http.downloadFile({
        url: documentUrl,
        filePath,
      });
      console.log(`Archivo descargado en ${filePath}`);
      this.downloadedToast(filePath);
    } catch (error) {
      console.log(`Error al descargar el archivo: ${error}`);
    }
  }

  async downloadedToast(filePath) {
    const toast = await this.toastController.create({
      message: `Archivo descargado en ${filePath}`,
      duration: 5000,
      position: 'top',
    });

    await toast.present();
  }

  async deleteDoc(url) {
    this.docs.deleteDoc(url).then(async (res) => {
        let index: number = this.docsListFormatted.indexOf({url: url});
        this.docsListFormatted.splice(index, 1);

        const toast = await this.toastController.create({
          message: 'Documento eliminado',
          duration: 5000,
          position: 'bottom',
        });
    
        await toast.present();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addDocs() {
    this.router.navigate(['/admin-dashboard/documents/manage-docs/add-docs'], {queryParams: {email: this.userEmail}});
  }
}
