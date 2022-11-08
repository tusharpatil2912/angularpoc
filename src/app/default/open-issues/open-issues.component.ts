import { Component, OnInit } from '@angular/core';
import { NotifierService } from "angular-notifier";
import { ProjectDetailsService } from "../../services/project-details.service";
import { TaskDetailsService } from "../../services/task-details.service";
import { TaskbuttonComponent } from "../agCustomCells/taskbutton/taskbutton.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-open-issues',
  templateUrl: './open-issues.component.html',
  styleUrls: ['./open-issues.component.scss']
})
export class OpenIssuesComponent implements OnInit {
  openIssuesList;
  private gridApi;
  reviewerId;
  IssuesList=[
  {"id":1,"taskid":"100","projectname":"Project 1","description":"Bug 1","createdDate":"2021-04-15","Detected By":"Sunil"},
  {"id":2,"taskid":"101","projectname":"Project 2","description":"Bug 2","createdDate":"2021-04-15","Detected By":"Tushar"},
  {"id":3,"taskid":"102","projectname":"Project 3","description":"Bug 3","createdDate":"2021-04-15","Detected By":"Rishi"},
  {"id":4,"taskid":"103","projectname":"Project 4","description":"Bug 4","createdDate":"2021-04-15","Detected By":"Ramya"},
  {"id":5,"taskid":"104","projectname":"Project 5","description":"Bug 5","createdDate":"2021-04-15","Detected By":"Chethan"}
];

  constructor(
    private detailsapi: ProjectDetailsService,
    private notifier: NotifierService,
    private taskapi: TaskDetailsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    var userData = JSON.parse(localStorage.getItem('currentUser'));
    this.reviewerId = userData.user['resourceId'];
    this.spinner.show();
    this.taskapi.GetPeerReviewTasksById(this.reviewerId).subscribe((data)=>{
      //console.log(data);
      this.rowData = data;
      this.spinner.hide();
    },(error)=>{
      this.notifier.notify("error", "API Error. Showing Mockup Data");
      this.spinner.hide();
    });
  }

  columnDefs = [
    { headerName:'Task ID',field: 'taskId', width: 100,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Task Name',field: 'taskName', width: 200,minWidth: 300, resizable: true, sortable: true, filter: true },
    { headerName:'Sub Task Name',field: 'subTaskName', width: 200,minWidth: 300, resizable: true, sortable: true, filter: true },
    { headerName:'Task ETC',field: 'taskETC', width: 200,minWidth: 200, resizable: true, sortable: true, filter: true },
    { headerName:'Created Date',field: 'taskCreatedDate', width: 120,minWidth: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Status',field: 'taskId', cellRendererFramework: TaskbuttonComponent, width: 100,minWidth: 80, resizable: true, sortable: true,  filter: true}
   ];

   rowData = null;
   
   
   onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
}
