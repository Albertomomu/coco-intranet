import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfileViewPageRoutingModule } from './user-profile-view-routing.module';

import { UserProfileViewPage } from './user-profile-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfileViewPageRoutingModule
  ],
  declarations: [UserProfileViewPage]
})
export class UserProfileViewPageModule {}
