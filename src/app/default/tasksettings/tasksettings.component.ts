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
  }

  columnDefs = [
    { headerName:'Sl no',field: 'id', width: 150, resizable: true, sortable: true, filter: true },
    { headerName:'Name',field: 'Name', width: 150, resizable: true, sortable: true, filter: true },
    { headerName:'Project',field: 'id', width: 527, resizable: true, sortable: true, filter: true },
    { headerName:'task',field: 'id',cellRendererFramework: AgDetailsButtonComponent, width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'open Task',field: 'id',cellRendererFramework: AgSwimlanesButtonComponent, width: 150, resizable: true, sortable: true, filter: true},
    { headerName:'skills',field: 'id',cellRendererFramework: AgSettingsButtonComponent, width: 150, resizable: true, sortable: true,  filter: true},
    { headerName:'select',field: 'id',cellRendererFramework: AgSettingsButtonComponent, width: 150, resizable: true, sortable: true,  filter: true}
];

rowData = null;
  OnGridReady(){

  }
}
