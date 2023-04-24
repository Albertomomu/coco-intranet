import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserPage } from './edit-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserPage,
  },
  {
    path: 'user-profile-view/:uid',
    loadChildren: () =>
      import('./user-profile-view/user-profile-view.module').then(
        (m) => m.UserProfileViewPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserPageRoutingModule {}
