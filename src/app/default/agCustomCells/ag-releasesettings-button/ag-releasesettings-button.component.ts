import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-releasesettings-button',
  templateUrl: './ag-releasesettings-button.component.html',
  styleUrls: ['./ag-releasesettings-button.component.scss']
})
export class AgReleasesettingsButtonComponent implements OnInit {

  data:any;
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params){
    this.data=params.value;
  }

}
