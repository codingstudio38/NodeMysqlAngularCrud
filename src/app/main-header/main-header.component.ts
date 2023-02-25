import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     $(document).ready(() => {
    // alert();
    });
  }

}
