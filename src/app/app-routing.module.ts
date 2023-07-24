import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ServicesComponent } from './services/services.component';

import { PriceComponent } from './price/price.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FoodmenuComponent } from './foodmenu/foodmenu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aboutus', component: AboutusComponent },

  {
    path: 'facilities',
    component: FacilitiesComponent,
    children: [
      { path: 'services', component: ServicesComponent },
      { path: 'foodmenu', component: FoodmenuComponent },
      { path: 'price', component: PriceComponent },
      { path: '', redirectTo: 'services', pathMatch: 'full' },
    ],
  },

  { path: 'contactus', component: ContactusComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin-profile/:username',
    loadChildren: () =>
      import('./admin-profile/admin-profile.module').then(
        (m) => m.AdminProfileModule
      ),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
