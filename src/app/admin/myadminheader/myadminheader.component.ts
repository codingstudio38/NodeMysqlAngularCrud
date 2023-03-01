import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'app-myadminheader',
  templateUrl: './myadminheader.component.html',
  styleUrls: ['./myadminheader.component.css']
})
export class MyadminheaderComponent implements OnInit {

  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService) { } 

  ngOnInit(): void {
    // console.log(this.loggedinuser);
  }
checklogin:boolean =  this.APIservice.CheckUserIsLoggedin();
loggedinuser:any =  this.APIservice.LoggedinUserData();





LogOut(){
if(this.checklogin){
  
}

}


}
