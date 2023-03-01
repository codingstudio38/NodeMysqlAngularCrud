import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from '../services/my-api-helper.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService) { }
 
  ngOnInit(): void {
     $(document).ready(() => {
    // alert();
    });
  }
checklogin:boolean =  this.APIservice.CheckUserIsLoggedin();



}
