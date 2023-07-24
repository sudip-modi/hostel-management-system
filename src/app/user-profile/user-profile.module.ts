import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AddHelpComponent } from './add-help/add-help.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    AddHelpComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,HttpClientModule

  ]
})
export class UserProfileModule { }
