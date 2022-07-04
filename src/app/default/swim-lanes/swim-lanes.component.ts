import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskDetailsService } from "../../services/task-details.service";
import { ProjectDetailsService } from "../../services/project-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-swim-lanes',
  templateUrl: './swim-lanes.component.html',
  styleUrls: ['./swim-lanes.component.scss']
})
export class SwimLanesComponent implements OnInit {

  projectTaskDetails:any;
  projectDetails:any;
  projectId:number;

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
  }

  projectName = "Project 1";

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  inProgress = [
    'start work',
    'watch TV',
    'Check Whatsapp'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
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

}
