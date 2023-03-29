import { Component, OnInit } from '@angular/core';
import { getDownloadURL } from 'firebase/storage';
import { DocumentsService } from 'src/app/core/services/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  docsList: any = [];

  constructor(private docs: DocumentsService) { }

  ngOnInit() {
    this.getDocs()
  }

  getDocs(){
    this.docs.getDocs().then(async responseList => {
      for(const item of responseList.items){
        const name = item.name;
          const url = await getDownloadURL(item);
          this.docsList.push({name, url});
      }
      console.log(this.docsList)
    })
  }

}
