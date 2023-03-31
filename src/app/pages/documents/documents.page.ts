import { Component, OnInit } from '@angular/core';
import { getDownloadURL } from 'firebase/storage';
import { DocumentsService } from 'src/app/core/services/documents.service';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  docsList: any = [];

  constructor(private docs: DocumentsService, private document: DocumentViewer) { }

  ngOnInit() {
    this.getDocs()
  }

  openDocument(documentUrl: string): void {
    Browser.open({ url: documentUrl });
  }

  openDocuments(documentUrl: string): void {
    const options: DocumentViewerOptions = {
      title: 'file'
    }
    this.document.viewDocument(documentUrl, 'application/pdf', options)
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

  async downloadDocument(documentUrl: string, documentName: string): Promise<void> {
    const response = await fetch(documentUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result!.toString();
      Filesystem.writeFile({
        path: documentName,
        data: base64data,
        directory: Directory.Documents,
      }).then(() => {
        console.log(`El documento ${documentName} se ha descargado correctamente`);
      }).catch((error: any) => {
        console.error(`Error al descargar el documento: ${error}`);
      });
    };
  }


}
