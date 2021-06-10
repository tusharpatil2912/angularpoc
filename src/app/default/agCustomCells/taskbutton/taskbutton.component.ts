import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taskbutton',
  templateUrl: './taskbutton.component.html',
  styleUrls: ['./taskbutton.component.scss']
})
export class TaskbuttonComponent implements OnInit {

  data:any;
  constructor() { }

  ngOnInit(): void {
  }
  agInit(params){
    this.data=params.value;
  }
  
}
