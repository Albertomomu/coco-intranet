import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SatisfactionFormSuccessPage } from './satisfaction-form-success.page';

const routes: Routes = [
  {
    path: '',
    component: SatisfactionFormSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SatisfactionFormSuccessPageRoutingModule {}
