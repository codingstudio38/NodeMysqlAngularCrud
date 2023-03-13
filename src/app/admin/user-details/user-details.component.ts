import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
 
  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService, private routerparam: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.routerparam.snapshot.queryParamMap.get('id')) {
      this.router.navigateByUrl('/admin/dashboard');
    }
    this.query_userid = this.routerparam.snapshot.queryParamMap.get('id');
    this.param_userid = this.routerparam.snapshot.paramMap.get('id');
    $(document).ready(() => {
        document.title ="Admin- User Details"; 
    });
    this.UserFindById(this.query_userid);
  }



  query_userid: any;
  param_userid: any;
  checklogin: boolean = this.APIservice.CheckUserIsLoggedin();
  loggedinuser: any = this.APIservice.LoggedinUserData();


  apidata: any;
  apistatusCode: any;
  message: any;
  user: any;
  UserFindById(id: any) {
    if (!this.checklogin) {
      alert("You must login.");
    }
    this.APIservice.LoggedinUserData();
    this.APIservice.UserFindById(id).subscribe((response: HttpEvent<any>) => {
      switch (response.type) {
        case HttpEventType.Sent:
          //console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          //this.evenTotal = response.total;
          //this.progress = Math.round(response.loaded / this.evenTotal * 100);
          break;
        case HttpEventType.Response:
          this.apidata = response.body;
          this.apistatusCode = this.apidata.status;
          this.message = `Code ${this.apidata.status}! ${this.apidata.message}`;
          console.clear();
          //console.log(this.apidata);
          if(this.apidata.status == 200){
            this.user = this.apidata.user;
          } else {
            alert(this.message);
            this.router.navigateByUrl('/admin/userslist');
          }
      }
    });


  }















}
