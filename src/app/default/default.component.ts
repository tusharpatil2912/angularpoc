import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen=true;
  drawerMode="side";
  screenWidth: any;

  constructor() { }

  ngOnInit(): void {
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
