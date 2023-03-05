import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyApiHelperService } from '../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
 
  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  if (this.APIservice.CheckUserIsLoggedin()) {
    this.router.navigate(['/admin/dashboard']);
  }
     $(document).ready(() => {
        document.title ="Login";
    });



  }
 
loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  })
  get email() {
    return this.loginform.get('email');
  }
  get password() {
    return this.loginform.get('password');
  }

  buttonm: any = "Login";
  apidata: any;
  apistatusCode: any;
  login_message: any = "";
  evenTotal: any;
  progress: any;
  register() {
    // console.clear();
    // console.log(this.loginform); return;
    this.buttonm = `<i class="fa fa-spinner" aria-hidden="true"></i>`;
    const Form = new FormData();
    Form.append('email', this.loginform.get('email')?.value);
    Form.append('password', this.loginform.get('password')?.value);
    this.APIservice.Login(Form).subscribe((response: HttpEvent<any>) => {
      switch (response.type) {
        case HttpEventType.Sent:
          //console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          this.evenTotal = response.total;
          this.progress = Math.round(response.loaded / this.evenTotal * 100);
          break;
        case HttpEventType.Response:
          this.apidata = response.body;
          this.apistatusCode = this.apidata.status;
          this.login_message = `<strong>Code ${this.apidata.status} !</strong> ${this.apidata.message}`;
          this.buttonm = `Login`;
          console.clear();
         // console.log(this.apidata);
          if (this.apidata.status == 200) {
            this.loginform.reset(); 
            window.localStorage.clear();
            window.localStorage.setItem("loggedin_user", JSON.stringify(this.apidata.user));
            this.router.navigateByUrl('/admin/dashboard');
          }
          setTimeout(() => {
            this.apistatusCode = "";
          }, 4000);
      }
    });
  }












}
