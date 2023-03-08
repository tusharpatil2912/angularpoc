import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskDetailsService } from 'src/app/services/task-details.service';
import _ from 'lodash';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-my-tasks-tile',
  templateUrl: './my-tasks-tile.component.html',
  styleUrls: ['./my-tasks-tile.component.scss']
})
export class MyTasksTileComponent implements OnInit {

  ToDoCount:number = 0;
  InProgressCount:number = 0;
  CompletedCount:number = 0;
  currentUser: any;

  constructor(
    private service:TaskDetailsService,
    private spinner: NgxSpinnerService,
    private authService: UserAuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.getTasksCount();
  }

  getTasksCount(){
    this.spinner.show('tasks-tile');
    this.service.getTaskByResourceId(this.currentUser['user'].resourceId).subscribe(
      data=>{
        this.ToDoCount = _.filter(data,['taskStatus','todo'])?.length;
        this.InProgressCount = _.filter(data,['taskStatus','inprogress'])?.length;
        this.CompletedCount = _.filter(data,['taskStatus','completed'])?.length;

        this.spinner.hide('tasks-tile');
      },err=>{
        this.spinner.hide('tasks-tile');
      }
    )
  }

}
