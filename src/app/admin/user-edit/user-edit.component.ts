import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService, private routerparam: ActivatedRoute) { }



  ngOnInit(): void {
    if (!this.routerparam.snapshot.queryParamMap.get('id')) {
      this.router.navigateByUrl('/admin/dashboard');
    }
    this.query_userid = this.routerparam.snapshot.queryParamMap.get('id');
    this.param_userid = this.routerparam.snapshot.paramMap.get('id');
    $(document).ready(() => {
      document.title = "Admin- User Edit";

    });
    this.UserFindById(this.query_userid);
  }



  query_userid: any;
  param_userid: any;
  checklogin: boolean = this.APIservice.CheckUserIsLoggedin();
  loggedinuser: any = this.APIservice.LoggedinUserData();

  profilephoto = new FormGroup({
    id: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    oldfile: new FormControl(''),
  })
  get photo() {
    return this.profilephoto.get('photo');
  }


  personalform = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])
  })
  get name() {
    return this.personalform.get('name');
  }
  get email() {
    return this.personalform.get('email');
  }
  get phone() {
    return this.personalform.get('phone');
  }


  profilepassword = new FormGroup({
    id: new FormControl('', [Validators.required]),
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
  });
  get old_password() {
    return this.profilepassword.get('old_password');
  }
  get new_password() {
    return this.profilepassword.get('new_password');
  }


  apidata: any;
  apistatusCode: any;
  Code: any="";
  message: any;
  user: any;
  userphoto: any = "http://localhost:5000/usersfile/ava1-bg.webp";
  UserFindById(id: any) {
    this.APIservice.LoggedinUserData();
    if (!this.checklogin) {
      alert("You must login.");
    }
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
          this.apistatusCode = "Status "+this.apidata.status;
          this.Code = this.apidata.status;
          this.message = this.apidata.message;
          console.clear();
          //console.log(this.apidata);
          if (this.apidata.status == 200) {
            this.user = this.apidata.user;
            if (this.user.photo !== null) {
              this.userphoto = `http://localhost:5000/usersfile/${this.user.photo}`;
            }

            this.personalform.patchValue({
              id: this.user.id,
              name: this.user.name,
              email: this.user.email,
              phone: this.user.phone
            });
            this.profilephoto.patchValue({
              id: this.user.id,
              oldfile: this.user.photo,
            });
            this.profilepassword.patchValue({
              id: this.user.id,
            });
            
          } else {
            alert(this.message);
            this.router.navigateByUrl('/admin/userslist');
          }
          setTimeout(()=>{
            this.Code = "";
          },4000);
      }
    });
  }



  //http://localhost:5000/update-photo
  //http://localhost:5000/change-password
  //http://localhost:5000/update
  

  uploadFile(event: any): void {
    const test: any = document.getElementById("photo") as HTMLInputElement | null;
    const Avatar: any = document.getElementById("Avatar") as HTMLInputElement | null;
    if (test.files.length !== undefined && test.files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        Avatar.src = e.target.result;
      };
      reader.readAsDataURL(test.files[0]);
    } else {
      Avatar.src = this.userphoto;
    }

    if (event.target.files.length > 0) {
      this.profilephoto.patchValue({
        photo: <File>event.target.files[0]
      });

    } else {
      this.profilephoto.patchValue({
        photo: ""
      });
    }
  }


  UpdatePhoto() {
    this.APIservice.LoggedinUserData();
    if (!this.checklogin) {
      alert("You must login.");
    }
    const myphotoform = new FormData();
    myphotoform.append('id', this.profilephoto.get('id')?.value);
    myphotoform.append('photo', this.profilephoto.get('photo')?.value);
    myphotoform.append('oldfile', this.profilephoto.get('oldfile')?.value);
    this.APIservice.UpdatePhoto(myphotoform).subscribe((response: HttpEvent<any>) => {
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
          this.apistatusCode = "Status "+this.apidata.status;
          this.Code = this.apidata.status;
          this.message = this.apidata.message;
          console.clear();
          //console.log(this.apidata);
          if (this.apidata.status == 200) {
            this.profilephoto.reset();
            this.profilephoto.patchValue({
              id: this.user.id,
              oldfile: this.apidata.file_name
            });
            this.userphoto = `http://localhost:5000/usersfile/${this.apidata.file_name}`;
          } else {
            alert(this.message);
          }
          setTimeout(()=>{
            this.Code = "";
          },4000);
      }
    });
  }
 

UpdatePersonal() {
this.APIservice.LoggedinUserData();
 if (!this.checklogin) {
      alert("You must login.");
    } 
    const myform = new FormData();
    myform.append('id', this.personalform.get('id')?.value);
    myform.append('name', this.personalform.get('name')?.value);
    myform.append('email', this.personalform.get('email')?.value);
     myform.append('phone', this.personalform.get('phone')?.value);
    this.APIservice.UpdatePersonal(myform).subscribe((response: HttpEvent<any>) => {
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
          this.apistatusCode = "Status "+this.apidata.status;
          this.Code = this.apidata.status;
          this.message = this.apidata.message;
          console.clear();
          console.log(this.apidata);
          setTimeout(()=>{
            this.Code = "";
          },4000);
      }
    });
}



UpdatePassword() {

}



HideAlert(){
  this.Code = "";
}


}
