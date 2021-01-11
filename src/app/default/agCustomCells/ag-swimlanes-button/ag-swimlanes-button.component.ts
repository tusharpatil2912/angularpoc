import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-swimlanes-button',
  templateUrl: './ag-swimlanes-button.component.html',
  styleUrls: ['./ag-swimlanes-button.component.scss']
})
export class AgSwimlanesButtonComponent implements OnInit {

  data:any;
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params){
    this.data=params.value;
  }

}
