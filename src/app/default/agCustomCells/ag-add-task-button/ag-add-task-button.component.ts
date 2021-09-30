import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-add-task-button',
  templateUrl: './ag-add-task-button.component.html',
  styleUrls: ['./ag-add-task-button.component.scss']
})
export class AgAddTaskButtonComponent implements OnInit {

  data:any;
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params){
    this.data=params.value;
  }

}
