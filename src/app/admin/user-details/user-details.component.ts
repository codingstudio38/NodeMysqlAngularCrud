import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService,private routerparam: ActivatedRoute) { } 

  ngOnInit(): void {
     if(!this.routerparam.snapshot.queryParamMap.get('id')){
        this.router.navigateByUrl('/admin/dashboard');
    }
    this.query_userid = this.routerparam.snapshot.queryParamMap.get('id');
    this.param_userid = this.routerparam.snapshot.paramMap.get('id');
  }
 


query_userid:any;
param_userid:any;
checklogin:boolean =  this.APIservice.CheckUserIsLoggedin();
loggedinuser:any =  this.APIservice.LoggedinUserData(); 
















}
