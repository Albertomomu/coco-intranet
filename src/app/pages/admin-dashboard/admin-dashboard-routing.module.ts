import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardPage } from './admin-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
  },
  {
    path: 'create-user',
    loadChildren: () =>
      import('./users/create-user/create-user.module').then(
        (m) => m.CreateUserPageModule
      ),
  },
  {
    path: 'edit-user',
    loadChildren: () =>
      import('./users/edit-user/edit-user.module').then(
        (m) => m.EditUserPageModule
      ),
  },
  {
    path: 'delete-user',
    loadChildren: () =>
      import('./users/delete-user/delete-user.module').then(
        (m) => m.DeleteUserPageModule
      ),
  },  {
    path: 'documents',
    loadChildren: () => import('./documents/documents.module').then( m => m.DocumentsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardPageRoutingModule {}
