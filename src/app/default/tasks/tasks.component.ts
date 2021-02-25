import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  columnDefs = [
    { headerName:'Sl No',field: 'id', width: 150, resizable: true, sortable: true, filter: true },
    { headerName:'Task Id',field: 'Name', width: 150, resizable: true, sortable: true, filter: true },
    { headerName:'Task description',field: 'id', width: 527, resizable: true, sortable: true, filter: true },
    { headerName:'Created Date',field: 'id', width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'Assigned to',field: 'id', width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'Status',field: 'id', width: 150, resizable: true, sortable: true,  filter: true},
    { headerName:'Reason',field: 'id', width: 150, resizable: true, sortable: true,  filter: true}
];
}
