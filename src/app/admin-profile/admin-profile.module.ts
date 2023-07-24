import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { AdminProfileComponent } from './admin-profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { FilterPipe } from '../filter.pipe';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AdminProfileComponent,
    AddUserComponent,
    ViewUsersComponent,
    UpdateUserComponent,
    FilterPipe
    

   
  ],
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ]
})
export class AdminProfileModule { }
