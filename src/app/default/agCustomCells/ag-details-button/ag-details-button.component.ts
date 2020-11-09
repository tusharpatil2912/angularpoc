import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-details-button',
  templateUrl: './ag-details-button.component.html',
  styleUrls: ['./ag-details-button.component.scss']
})
export class AgDetailsButtonComponent implements OnInit {

  data:any;
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params){
    this.data=params.value;
  }

}
