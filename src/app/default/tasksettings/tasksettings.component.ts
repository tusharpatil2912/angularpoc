import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskDetailsService } from "../../services/task-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { AgSettingsButtonComponent } from "../agCustomCells/ag-settings-button/ag-settings-button.component";

@Component({
  selector: 'app-tasksettings',
  templateUrl: './tasksettings.component.html',
  styleUrls: ['./tasksettings.component.scss']
})
export class TasksettingsComponent implements OnInit {

  projectDetails;
  taskDetails;
  projectId:number;
  pId:number;
  pageTitile:string;
  submitbtnTitile:string;
  visibility = false;
  taskSettingsForm: FormGroup;
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
      this.taskSettingsForm.patchValue({id:this.taskDetails.id,
                                        name:this.taskDetails.name,
                                        description : this.taskDetails.description, 
                                        sme : this.taskDetails.sme, 
                                        owner:this.taskDetails.owner,
                                        createdDate:this.taskDetails.createdDate})
    },(error)=>{
      this.notifier.notify("error","API Error. Showing Mockup Data");
      this.taskDetails={"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"};
      this.taskSettingsForm.patchValue({id:this.taskDetails.id,
        name:this.taskDetails.name,
        description : this.taskDetails.description, 
        sme : this.taskDetails.sme, 
        owner:this.taskDetails.owner,
        createdDate:this.taskDetails.createdDate})
    });
  }
  else{
    this.pageTitile = "Add New Task";
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
    this.taskSettingsForm = this.fb.group({
      id: [''],
      name: [''],
      time: [''],
    });
  }

  columnDefs = [
    { headerName:'Sl no',field: 'id', width: 100, resizable: true, sortable: true, filter: true },
    { headerName:'Name',field: 'name', width: 200, resizable: true, sortable: true, filter: true },
    { headerName:'Project',field: 'id', width: 400, resizable: true, sortable: true, filter: true },
    { headerName:'Task',field: 'id', width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'Open Task',field: 'id', width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'Skills',field: 'id', width: 150, resizable: true, sortable: true,  filter: true},
    { headerName:'Select',field: 'id',cellRendererFramework: AgSettingsButtonComponent, width: 150, resizable: true, sortable: true,  filter: true}
];

rowData = [
  {id:'1',name:'rishi'},
  {id:'2',name:'tushar'},
  {id:'3',name:'chethan'}
];

  OnGridReady(){

  }
}
