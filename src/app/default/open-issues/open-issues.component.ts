import { Component, OnInit } from '@angular/core';
import { NotifierService } from "angular-notifier";
import { ProjectDetailsService } from "../../services/project-details.service";

@Component({
  selector: 'app-open-issues',
  templateUrl: './open-issues.component.html',
  styleUrls: ['./open-issues.component.scss']
})
export class OpenIssuesComponent implements OnInit {
  openIssuesList;
  IssuesList=[
  {"id":1,"taskid":"100","projectname":"Project 1","description":"Bug 1","createdDate":"2021-04-15","Detected By":"Sunil"},
  {"id":2,"taskid":"101","projectname":"Project 2","description":"Bug 2","createdDate":"2021-04-15","Detected By":"Tushar"},
  {"id":3,"taskid":"102","projectname":"Project 3","description":"Bug 3","createdDate":"2021-04-15","Detected By":"Rishi"},
  {"id":4,"taskid":"103","projectname":"Project 4","description":"Bug 4","createdDate":"2021-04-15","Detected By":"Ramya"},
  {"id":5,"taskid":"104","projectname":"Project 5","description":"Bug 5","createdDate":"2021-04-15","Detected By":"Chethan"}
];

  constructor(private detailsapi: ProjectDetailsService,private notifier: NotifierService,) { }

  ngOnInit(): void {
    this.detailsapi.getProjecttList().subscribe((data)=>{
      //console.log(data);
      this.openIssuesList = data;
      this.rowData = data;
    },(error)=>{
      this.rowData=this.IssuesList;
      this.notifier.notify("error", "API Error. Showing Mockup Data");
    });
  }

  columnDefs = [
    { headerName:'Bug ID',field: 'id', width: 150, resizable: true, sortable: true, filter: true },
    { headerName:'Task ID',field: 'taskid', width: 150, resizable: true, sortable: true, filter: true },
    { headerName:'Project Name',field: 'projectname', width: 150, resizable: true, sortable: true, filter: true },
    { headerName:'Bug Description',field: 'description', width: 200, resizable: true, sortable: true, filter: true },
    { headerName:'Created Date',field: 'createdDate', width: 200, resizable: true, sortable: true, filter: true },
    { headerName:'Detected By',field: 'Detected By', width: 200, resizable: true, sortable: true, filter: true }
   ];

   rowData = null;

}
