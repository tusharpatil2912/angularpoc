import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-settings-button',
  templateUrl: './ag-settings-button.component.html',
  styleUrls: ['./ag-settings-button.component.scss']
})
export class AgSettingsButtonComponent implements OnInit {

  data:any;
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params){
    this.data=params.value;
  }

}
