import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardGuard } from './Guards/login-guard.guard';



const routes: Routes = [
  {
    path: 'admin',
    canActivate: [LoginGuardGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
