import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteDocsPage } from './delete-docs.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteDocsPage
  },
  {
    path: 'add-docs',
    loadChildren: () => import('./add-docs/add-docs.module').then( m => m.AddDocsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteDocsPageRoutingModule {}
