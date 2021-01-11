import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskDetailsService } from "../../services/task-details.service";
import { ProjectDetailsService } from "../../services/project-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';

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
    private activeRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.projectId=this.activeRoute.snapshot.params.id;
    this.detailsapi.getTaskByProjectId(this.projectId).subscribe((data)=>{
      //console.log(data);
      this.projectTaskDetails = data;
    });
    this.projectdetailsapi.getProjectDetails(this.projectId).subscribe((data)=>{
      //console.log(data);
      this.projectDetails = data;
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

}
