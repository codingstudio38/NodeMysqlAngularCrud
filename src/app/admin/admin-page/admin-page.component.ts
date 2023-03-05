import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService) { }

  checklogin: boolean = this.APIservice.CheckUserIsLoggedin();
  loggedinuser: any = this.APIservice.LoggedinUserData();

  ngOnInit(): void {
    if (!this.checklogin) {
      window.localStorage.clear();
      this.router.navigate(['/login']);
    }
  }









}
