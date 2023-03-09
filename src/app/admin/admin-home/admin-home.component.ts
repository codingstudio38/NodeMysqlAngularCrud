import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService) { }
 
  ngOnInit(): void {
     $(document).ready(() => {
        document.title ="Admin- Dashboard";
    });
  }

  checklogin: boolean = this.APIservice.CheckUserIsLoggedin();
  loggedinuser: any = this.APIservice.LoggedinUserData();





}
