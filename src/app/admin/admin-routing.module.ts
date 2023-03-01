import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
const routes: Routes = [
  { 
    path: '',
    component: AdminPageComponent, children: [ 
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminHomeComponent },
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { } 
