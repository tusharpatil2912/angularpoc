import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskDetailsService } from "../../services/task-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { AgDetailsButtonComponent } from "../agCustomCells/ag-details-button/ag-details-button.component";
import { AgSettingsButtonComponent } from "../agCustomCells/ag-settings-button/ag-settings-button.component";
import { AgSwimlanesButtonComponent } from "../agCustomCells/ag-swimlanes-button/ag-swimlanes-button.component";

@Component({
  selector: 'app-tasksettings',
  templateUrl: './tasksettings.component.html',
  styleUrls: ['./tasksettings.component.scss']
})
export class TasksettingsComponent implements OnInit {

  projectDetails;
  projectId:number;
  pId:number;
  pageTitile:string;
  submitbtnTitile:string;
  visibility = false;
  taskSettingsForm: FormGroup;
  

  constructor(
  private fb: FormBuilder,
    private detailsapi: TaskDetailsService,
    private notifier: NotifierService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }
  

  ngOnInit(): void {
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
    { headerName:'Task',field: 'id',cellRendererFramework: AgDetailsButtonComponent, width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'Open Task',field: 'id',cellRendererFramework: AgSwimlanesButtonComponent, width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'Skills',field: 'id',cellRendererFramework: AgSettingsButtonComponent, width: 150, resizable: true, sortable: true,  filter: true},
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
