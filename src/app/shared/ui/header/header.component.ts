import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from "../../../services/user-auth.service";
import {GuidedTour, Orientation, GuidedTourModule, GuidedTourService} from 'ngx-guided-tour';
import { DashboardComponent} from '../../../default/dashboard/dashboard.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dashboardTour;
  constructor(
    private userApi:UserAuthService,
    private router: Router,
    private guidedTourService: GuidedTourService,
    private dashcomp: DashboardComponent 
  ) { 
    this.dashboardTour = this.dashcomp.dashboardTour;
  }
  

  ngOnInit(): void {
  }
  logoutUser(){
    this.userApi.logout();
    this.router.navigate(['/login']);
  }

  siteTourStart(){
    this.guidedTourService.startTour(this.dashboardTour);
  }

}
