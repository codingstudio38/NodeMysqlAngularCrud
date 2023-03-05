import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyadminheaderComponent } from './myadminheader/myadminheader.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component'; 

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminPageComponent,
    MyadminheaderComponent,
    UsersListComponent,
    UserDetailsComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
