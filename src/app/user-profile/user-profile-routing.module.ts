import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { ViewHelpComponent } from '../shared/view-help/view-help.component';

import { AddHelpComponent } from './add-help/add-help.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [{ path: '', component: UserProfileComponent ,children:[
  {path:'view-help',component:ViewHelpComponent},
  {path:'add-help',component:AddHelpComponent},
  {path:'my-profile',component:MyProfileComponent},
  {path:'',redirectTo:'my-profile',pathMatch:'full'}
 

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
