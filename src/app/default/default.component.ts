import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from "../services/user-auth.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen=true;
  drawerMode="side";
  screenWidth: any;

  constructor(
    private userApi:UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.userApi.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 540) { // 768px portrait
      this.drawerMode = "over";
      this.sideBarOpen=false;
    }else{
      this.drawerMode = "side";
      this.sideBarOpen=true;
    }
  }

    sideBarToggler()
   {
     this.sideBarOpen=!this.sideBarOpen;
   }

}
