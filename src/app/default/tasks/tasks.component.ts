import { Component, OnInit } from '@angular/core';
import { TaskbuttonComponent } from '../agCustomCells/taskbutton/taskbutton.component';
import { TaskDetailsService } from "../../services/task-details.service";
import { NotifierService } from "angular-notifier";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private gridApi;
  taskList;
  mockupprojectList=[{"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"},{"id":2,"name":"My Second Project","description":"Desc 2","owner":"Owner 2","sme":"Sme 2","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-27"},{"id":3,"name":"My Third Project","description":"Desc 3","owner":"Owner 3","sme":"Sme 3","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-12-01"},{"id":4,"name":"My Fourth Project","description":"Desc 4","owner":"Owner 4","sme":"Sme 4","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-12-01"}];


  constructor(private detailsapi: TaskDetailsService,private notifier: NotifierService,) { }

  ngOnInit(): void {
    this.detailsapi.getTasksList().subscribe((data)=>{
      //console.log(data);
      this.taskList = data;
      this.rowData = data;
    },(error)=>{
      this.rowData=this.mockupprojectList;
      this.notifier.notify("error", "API Error. Showing Mockup Data");
    });
  }
  columnDefs = [
    { headerName:'Task Id',field: 'taskId', width: 100,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'TaskName',field: 'taskName', width: 200,minWidth: 100, resizable: true, sortable: true,  filter: true},
    { headerName:'Task description',field: 'taskDetails', width: 250,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Created Date',field: 'taskCreatedDate', width: 150,minWidth: 100, resizable: true, sortable: true, filter: true},
    { headerName:'Assigned to',field: 'taskOwner', width: 150,minWidth: 100, resizable: true, sortable: true, filter: true},
    { headerName:'Status',field: 'taskId', cellRendererFramework: TaskbuttonComponent, width: 150,minWidth: 80, resizable: true, sortable: true,  filter: true}

    
];

rowData= null;
//[
 // {taskId:'1',id:'1',name:'rishi'},
  //{taskId:'2',id:'2',name:'tushar'},
  //{taskId:'3',id:'3',name:'chethan'}
//];

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}
}
