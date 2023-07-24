import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './admin-profile.component';
import { ViewHelpComponent } from '../shared/view-help/view-help.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';




const routes: Routes = [{ path: '', component: AdminProfileComponent,children:[
  {path:'view-help',component:ViewHelpComponent},
  {path:'view-users',component:ViewUsersComponent},
  {path:'add-user',component:AddUserComponent},
  {path:'update-user',component:UpdateUserComponent},
  {path:'view-users/update-user/:id',component:UpdateUserComponent},
  {path:'',redirectTo:'add-user',pathMatch:'full'}

  
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProfileRoutingModule { }
