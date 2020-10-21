import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private routes : Router) { }

  ngOnInit(): void {
  }

  OnHomePageLoad()
  {
    //alert("My dashboard content 123");
    this.routes.navigate(['/dashboard']);
  }
  Dashboard(){
    //alert("My dashboard content");
   //this.router.navigate(['/employees']);
  }

}
