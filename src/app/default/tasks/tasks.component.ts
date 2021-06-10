import { Component, OnInit } from '@angular/core';
import { TaskbuttonComponent } from '../agCustomCells/taskbutton/taskbutton.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private gridApi;

  constructor() { }

  ngOnInit(): void {
  }
  columnDefs = [
    { headerName:'Sl No',field: 'id', width: 100,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Task Id',field: 'id', width: 100,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Task description',field: 'name', width: 520,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Created Date',field: 'id', width: 150,minWidth: 100, resizable: true, sortable: true, filter: true},
    { headerName:'Assigned to',field: 'name', width: 150,minWidth: 100, resizable: true, sortable: true, filter: true},
    { headerName:'Status',field: 'taskId', cellRendererFramework: TaskbuttonComponent, width: 150,minWidth: 80, resizable: true, sortable: true,  filter: true},
    { headerName:'Reason',field: 'id', width: 150,minWidth: 100, resizable: true, sortable: true,  filter: true}
];

rowData=[
  {taskId:'1',id:'1',name:'rishi'},
  {taskId:'2',id:'2',name:'tushar'},
  {taskId:'3',id:'3',name:'chethan'}
];

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}
}
