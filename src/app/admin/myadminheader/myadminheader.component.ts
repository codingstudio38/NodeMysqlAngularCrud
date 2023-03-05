import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
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


  
apidata: any;
apistatusCode: any;
login_message: any = "";
LogOut(){
if(!this.checklogin){
  alert("You must login.");
} 
// console.log(this.checklogin);
const user = this.loggedinuser;
 if(confirm("Are you sure you want to logout.")){
  this.APIservice.LogOut().subscribe((response: HttpEvent<any>) => {
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
          this.login_message = `Code ${this.apidata.status} ! ${this.apidata.message}`;
          console.clear();
          //console.log(this.apidata); 
          if (this.apidata.status == 200) {
            window.localStorage.clear();
            this.router.navigateByUrl('/login');
          } else{
            alert(this.login_message);
          }
          
      }
    });
 }

}







}
