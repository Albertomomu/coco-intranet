import { Component, OnInit } from '@angular/core';
import { getDownloadURL } from 'firebase/storage';
import { DocumentsService } from 'src/app/core/services/documents.service';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Http } from "@capacitor-community/http"
import { Router } from '@angular/router';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  docsList: any = [];

  constructor(private docs: DocumentsService, private router: Router) { }

  ngOnInit() {
    this.getDocs()
  }

  // BROWSER OPTION -> In some browsers it justs dowloads the file
  /*openDocument(documentUrl: string): void {
    Browser.open({ url: documentUrl });
  }*/

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


  downloadFile(documentUrl: string, documentName: string) {

    Http.downloadFile({
      url: documentUrl,
      filePath: `${Directory.Documents}/${documentName}`
    }).then(async (entry) => {
      console.log(`${Directory.Documents}/${documentName}`)
      /*const alert = await this.alertCtrl.create({
        header: 'Archivo descargado',
        message: `El archivo ${entry.path} ha sido descargado en el directorio Descargas.`,
        buttons: ['OK']
      });
      await alert.present();*/
    }).catch(async (error) => {
      console.log(error)
      /*const alert = await this.alertCtrl.create({
        header: 'Error',
        message: `Error al descargar el archivo: ${error.message}`,
        buttons: ['OK']
      });
      await alert.present();*/
    });
  }

  async downloadFile1(documentUrl: string, documentName: string) {
    try {
      // Crear el directorio si no existe
      const directoryPath = `${Directory.Documents}/CocoGlobalMedia`;
      await Filesystem.mkdir({
        path: directoryPath,
        directory: Directory.Documents,
        recursive: true // crea directorios anidados si no existen
      });

      // Descargar el archivo
      const filePath = `${directoryPath}/${documentName}`;
      await Http.downloadFile({
        url: documentUrl,
        filePath
      });

      console.log(`Archivo descargado en ${filePath}`);
    } catch (error) {
      console.log(`Error al descargar el archivo: ${error}`);
    }
  }
}
