import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from "../../../services/user-auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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

}
