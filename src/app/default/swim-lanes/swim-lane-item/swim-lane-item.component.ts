import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-swim-lane-item',
  templateUrl: './swim-lane-item.component.html',
  styleUrls: ['./swim-lane-item.component.scss']
})
export class SwimLaneItemComponent implements OnInit {

  @Input() ItemDetails: any;
  taskETA:any;

  constructor() { }

  ngOnInit(): void {
    this.taskETA = this.ItemDetails?.taskETA.split('T')[0];
  }

}
