import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyApiHelperService } from '../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  if (this.APIservice.CheckUserIsLoggedin()) {
    this.router.navigate(['/admin/dashboard']);
  }
    $(document).ready(() => {
      document.title = "Register";
    });

  }


  onSpaceAllowed(controller: FormControl) {
    if (controller.value !== null && controller.value.indexOf(' ') != -1) {
      return { noSoaceAllowed: true };
    }
    return null;
  }
 
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)])

  })
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get password() {
    return this.registerForm.get('password');
  }

  buttonm: any = "Register";
  apidata: any;
  apistatusCode: any;
  register_message: any = "";
  evenTotal: any;
  progress: any;
  register() {
    // console.clear();
    // console.log(this.registerForm); return;
    this.buttonm = `<i class="fa fa-spinner" aria-hidden="true"></i>`;
    const rgForm = new FormData();
    rgForm.append('name', this.registerForm.get('name')?.value);
    rgForm.append('email', this.registerForm.get('email')?.value);
    rgForm.append('password', this.registerForm.get('password')?.value);
    rgForm.append('phone', this.registerForm.get('phone')?.value);
    this.APIservice.Register(rgForm).subscribe((response: HttpEvent<any>) => {
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
          this.register_message = `<strong>Code ${this.apidata.status} !</strong> ${this.apidata.message}`;
          this.buttonm = `Register`;
          console.clear();
          // console.log(this.apidata);
          if (this.apidata.status == 200) {
            this.registerForm.reset();
          }
          setTimeout(() => {
            this.apistatusCode = "";
          }, 4000);
      }
    });
  }







}
