import { Component, OnInit } from '@angular/core';
import { MyApiHelperService } from './../../services/my-api-helper.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private APIservice: MyApiHelperService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
     $(document).ready(() => {
        document.title ="Admin- Users List";
    });

    this.GetUserList(this.searchkey_, 5, 1);
  }

  checklogin: boolean = this.APIservice.CheckUserIsLoggedin();
  loggedinuser: any = this.APIservice.LoggedinUserData();
 

 
  apidata: any;
  apistatusCode: any;
  message: any; 
  tbldata: any[] = [];
  responsdata: any[] = [];
  check: any[] = [];
  limitfiled: any[] = [5, 10, 25, 50, 100];
  pageis: any = 1;
  total: any;
  limitis: any = 5;
  searchkey_: any = "";
  GetUserList(searchkey: any, limit: any, page: any) {
    if (!this.checklogin) {
      alert("You must login.");
    }
    // console.log(this.checklogin);
    const user = this.loggedinuser;
    this.APIservice.GetUserList(searchkey, limit, page).subscribe((response: HttpEvent<any>) => {
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
          this.message = `Code ${this.apidata.status} ! ${this.apidata.message}`;
          this.tbldata = [];
          this.responsdata = [];
          this.check = [];
          if (this.apidata.status == 200) {
            this.responsdata = this.apidata.data;
            this.total = this.apidata.total_records;
            console.clear();
            //console.log(this.apidata);
            var from = this.apidata.from + 1;
            var to = this.apidata.to;
            for (let x = from; x <= to; x++) {
              this.check.push(x);
            }
            this.responsdata.forEach((item, index) => {
              this.tbldata.push({
                created_at: item.created_at,
                email: item.email,
                id: item.id,
                password: item.password,
                phone: item.phone,
                name: item.name,
                slno: this.check[index],
                photo : item.photo
              })
            });
          } else {
            alert(this.message);
          }



      }
    });
  }

  ChangeLimit(limit: any) {
    this.pageis = 1;
    this.limitis = limit;
    this.GetUserList(this.searchkey_, this.limitis, 1);
  }


  SearchTblData(keyword: any) {
    this.pageis = 1;
    this.limitis = 5;
    this.searchkey_ = keyword;
    this.GetUserList(this.searchkey_, this.limitis, 1);
  }


  deleteis(item: any) {

  }


  pageChangeEvent(item: any) {
    this.pageis = item;
    // this.limitis = 5;
    this.GetUserList(this.searchkey_, this.limitis, this.pageis);
  }


}
