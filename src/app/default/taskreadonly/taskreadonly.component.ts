import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskDetailsService } from "../../services/task-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";


@Component({
  selector: 'app-taskreadonly',
  templateUrl: './taskreadonly.component.html',
  styleUrls: ['./taskreadonly.component.scss']
})
export class TaskreadonlyComponent implements OnInit {

    private gridApi;
    projectDetails;
    taskDetails;
    projectId:number;
    pId:number;
    pageTitile:string;
    submitbtnTitile:string;
    visibility = false;
    taskReadonlyForm: FormGroup;
    taskId:number;
    tId:number;
    
  
    constructor(
    private fb: FormBuilder,
      private detailsapi: TaskDetailsService,
      private notifier: NotifierService, 
      private router: Router,
      private activeRoute: ActivatedRoute) { }
    
  
    ngOnInit(): void {
      
      this.taskId=this.activeRoute.snapshot.params.id;
      if(this.taskId){
        this.pageTitile = "Task Settings";
        this.submitbtnTitile = "Update";
        this.visibility = true;
      this.detailsapi.getTaskById(this.taskId).subscribe((data)=>{
        this.taskDetails = data;
        this.taskReadonlyForm.patchValue({taskId:this.taskDetails.taskId,
                                          projectId:this.taskDetails.projectId,
                                          taskName:this.taskDetails.taskName,
                                          description : this.taskDetails.taskDetails, 
                                          sme : this.taskDetails.sme, 
                                          owner:this.taskDetails.owner,
                                          createdDate:this.taskDetails.createdDate})
      },(error)=>{
        this.notifier.notify("error","API Error. Showing Mockup Data");
        this.taskDetails={"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"};
        this.taskReadonlyForm.patchValue({id:this.taskDetails.id,
          name:this.taskDetails.name,
          description : this.taskDetails.description, 
          sme : this.taskDetails.sme, 
          owner:this.taskDetails.owner,
          createdDate:this.taskDetails.createdDate})
      });
    }
    else{
      this.pageTitile = "New Task";
      this.submitbtnTitile = "Submit";
    }
    // this.projSettingsForm = this.fb.group({
    //   id: [''],
    //   name: [''],
    //   release: [''],
    //   codeDropDate: [''],
    //   codeFreezeDate: [''],
    //   createdDate:[''],
    //   description: [''],
    //   sme: [''],
    //   owner: [''],
    //   projectPhase: [''],
    // });
      this.taskReadonlyForm = this.fb.group({
        taskId: [''],
        projectId:[''],
        taskName: [''],
        name:[''],
        time: [''],
        description: [''],
      });
    }
  

  
  
  
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
  
    submitForm() {
      console.warn(this.taskReadonlyForm.value);
    }
  }
  