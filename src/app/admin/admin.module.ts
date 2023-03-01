import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyadminheaderComponent } from './myadminheader/myadminheader.component'; 

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminPageComponent,
    MyadminheaderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
