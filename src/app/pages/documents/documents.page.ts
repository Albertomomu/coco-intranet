import { Component, OnInit } from '@angular/core';
import { getDownloadURL } from 'firebase/storage';
import { DocumentsService } from 'src/app/core/services/documents.service';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory, GetUriOptions } from '@capacitor/filesystem';
import { Http } from "@capacitor-community/http"
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  docsList: any = [];

  constructor(private docs: DocumentsService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.getDocs()
  }

  // BROWSER OPTION -> In some browsers it justs dowloads the file
  /*openDocument(documentUrl: string): void {
    Browser.open({ url: documentUrl });
  }*/

  async downloadedToast(filePath) {
    const toast = await this.toastController.create({
      message: `Archivo descargado en ${filePath}`,
      duration: 5000,
      position: 'top'
    });

    await toast.present();
  }

  openDocument(documentUrl: string): void {
    this.router.navigate(['/document-viewer', documentUrl])
  }

  getDocs() {
    this.docs.getDocs().then(async responseList => {
      for (const item of responseList.items) {
        const name = item.name;
        const url = await getDownloadURL(item);
        this.docsList.push({ name, url });
      }
    })
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
        directory: Directory.Documents
      });
      if (!checkDirectoryExists) {
        await Filesystem.mkdir({
          path: directoryPath,
          directory: Directory.Documents,
          recursive: true // crea directorios anidados si no existen
        });
      }
      // Descargar el archivo
      const filePath = `${directoryPath}/${documentName}`;
      await Http.downloadFile({
        url: documentUrl,
        filePath
      });
      console.log(`Archivo descargado en ${filePath}`);
      this.downloadedToast(filePath);
    }
    catch (error) {
      console.log(`Error al descargar el archivo: ${error}`);
    }
  }
}
