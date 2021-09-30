import { Component, OnInit } from '@angular/core';
import { TaskbuttonComponent } from '../agCustomCells/taskbutton/taskbutton.component';
import { TaskDetailsService } from "../../services/task-details.service";
import { NotifierService } from "angular-notifier";
import { UserAuthService } from '../../services/user-auth.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private gridApi;
  taskList;
  taskFilter=true;
  filterName="Show All Tasks";
  mockupprojectList=[{"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"},{"id":2,"name":"My Second Project","description":"Desc 2","owner":"Owner 2","sme":"Sme 2","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-27"},{"id":3,"name":"My Third Project","description":"Desc 3","owner":"Owner 3","sme":"Sme 3","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-12-01"},{"id":4,"name":"My Fourth Project","description":"Desc 4","owner":"Owner 4","sme":"Sme 4","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-12-01"}];
  currentUser;

  constructor(private detailsapi: TaskDetailsService,private notifier: NotifierService,private authService:UserAuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if(this.currentUser['user'].designation=="developer"){
      this.getAllTasksByResourceId()
    }else{
      this.toggleTaskList()
    }    
  }
  columnDefs = [
    { headerName:'Id',field: 'taskId', width: 70,minWidth: 70, resizable: true, sortable: true, filter: true },
    { headerName:'Task Name',field: 'taskName', width: 250,minWidth: 100, resizable: true, sortable: true,  filter: true},
    { headerName:'Task Status',field: 'taskStatus',valueFormatter: this.stringFormatter, width: 110,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Created Date',field: 'taskCreatedDate', width: 110,minWidth: 100, resizable: true, sortable: true, filter: true},
    { headerName:'Project Name',field: 'projectName', width: 200,minWidth: 100, resizable: true, sortable: true,  filter: true},
    { headerName:'Assigned to',field: 'resourceName', width: 150,minWidth: 100, resizable: true, sortable: true, filter: true},
    { headerName:'Status',field: 'taskId', cellRendererFramework: TaskbuttonComponent, width: 100,minWidth: 80, resizable: true, sortable: true,  filter: true}

    
];

stringFormatter(params) {
  var fruit = params.value;
  if(fruit=="todo"){
    return "To Do"
  }else if (fruit=="inprogress") {
    return "In Progress"
  }else if (fruit=="completed") {
    return "Completed"
  }else if (fruit=="review") {
    return "Under Review"
  }else return fruit;
}

getAllTasks(){
  this.detailsapi.getTasksList().subscribe((data)=>{
    //console.log(data);
    this.taskList = data;
    this.rowData = data;
  },(error)=>{
    this.rowData=this.mockupprojectList;
    this.notifier.notify("error", "API Error. Showing Mockup Data");
  });
}

getAllTasksByResourceId(){
  //console.log(currentUser['user'].resourceId);
  this.detailsapi.getTaskByResourceId(this.currentUser['user'].resourceId).subscribe((data)=>{
    //console.log(data);
    this.taskList = data;
    this.rowData = data;
  },(error)=>{
    this.rowData=this.mockupprojectList;
    this.notifier.notify("error", "API Error. Showing Mockup Data");
  });
}

toggleTaskList(){
if(this.taskFilter){
  this.taskFilter=false
  this.filterName="Show My Tasks";
  //console.log("inside first block");
  this.getAllTasks();
}else if(!this.taskFilter){
  this.taskFilter=true
  this.filterName="Show All Tasks";
  //console.log("inside 2nd block");
  this.getAllTasksByResourceId();
}
}

rowData= null;

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}
}
