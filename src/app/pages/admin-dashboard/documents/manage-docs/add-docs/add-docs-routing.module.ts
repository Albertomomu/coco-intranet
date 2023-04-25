import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDocsPage } from './add-docs.page';

const routes: Routes = [
  {
    path: '',
    component: AddDocsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDocsPageRoutingModule {}
