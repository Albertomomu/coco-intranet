import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SatisfactionFormPage } from './satisfaction-form.page';

const routes: Routes = [
  {
    path: '',
    component: SatisfactionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SatisfactionFormPageRoutingModule {}
