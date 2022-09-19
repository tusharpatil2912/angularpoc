import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskDetailsService } from "../../services/task-details.service";
import { ProjectDetailsService } from "../../services/project-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NotifierService } from "angular-notifier";
import _ from "lodash";

@Component({
  selector: 'app-swim-lanes',
  templateUrl: './swim-lanes.component.html',
  styleUrls: ['./swim-lanes.component.scss']
})
export class SwimLanesComponent implements OnInit {

  projectTaskDetails:any = [];
  projectDetails:any;
  projectId:number;
  todo = [];
  inProgress = [];
  done = [];
  resourceData: any;

  constructor(private detailsapi: TaskDetailsService,
    private projectdetailsapi: ProjectDetailsService, 
    private router: Router,
    private notifier: NotifierService,
    private activeRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.projectId=this.activeRoute.snapshot.params.id;
    this.detailsapi.getTaskByProjectId(this.projectId).subscribe((data)=>{
      //console.log(data);
      this.projectTaskDetails = data;
      this.todo = _.filter(data,['taskStatus','todo']);
      this.inProgress = _.filter(data,['taskStatus','inprogress']);
      this.done = _.filter(data,['taskStatus','completed']);
    },(error)=>{
      //this.notifier.notify("error","API Error. Showing Mockup Data");
      this.projectTaskDetails =[{"taskId":1,"projectId":1,"taskName":"First task for p1","taskStatus":"completed","taskDetails":"desc for First task for p1","empId":"1"},{"taskId":2,"projectId":1,"taskName":"Second task for p1","taskStatus":"To Do","taskDetails":"Desc for second task for p1","empId":"2"},{"taskId":4,"projectId":1,"taskName":"Third Task for p1","taskStatus":"in progress","taskDetails":"desc for my third task of p1","empId":"1"},{"taskId":5,"projectId":1,"taskName":"fourth task for p1","taskStatus":"To Do","taskDetails":"desc of 4th task of p1","empId":"1"}];
    });
    this.projectdetailsapi.getProjectDetails(this.projectId).subscribe((data)=>{
      //console.log(data);
      this.projectDetails = data;
    },(error)=>{
      this.notifier.notify("error","API Error. Showing Mockup Data");
      this.projectDetails={"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"};
    });

    this.projectdetailsapi.getallocatedResourceList(this.projectId).subscribe((data)=>{
      //console.log(data);
      this.resourceData = data;
    },(error)=>{
      this.notifier.notify("error","API Error.");
    });
  }

  projectName = "Project 1";

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  goToBack(){
    window.history.back();
  }
  selectedRes(params){
    let data = this.projectTaskDetails;
    if(params !== "0"){
      this.todo = _.filter(data,{'taskStatus':'todo','resourceId':params});
      this.inProgress = _.filter(data,{'taskStatus':'inprogress','resourceId':params});
      this.done = _.filter(data,{'taskStatus':'completed','resourceId':params});
    }else {
      this.todo = _.filter(data,['taskStatus','todo']);
      this.inProgress = _.filter(data,['taskStatus','inprogress']);
      this.done = _.filter(data,['taskStatus','completed']);
    }
  }
}
