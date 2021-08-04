import { Component, OnInit } from '@angular/core';
import { AgDetailsButtonComponent } from "../agCustomCells/ag-details-button/ag-details-button.component";
import { ProjectDetailsService } from "../../services/project-details.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-release-settings',
  templateUrl: './release-settings.component.html',
  styleUrls: ['./release-settings.component.scss']
})
export class ReleaseSettingsComponent implements OnInit {

  private gridApi;
  releaseId;
  releaseDetails;
  releaseDetailsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private api: ProjectDetailsService,
    private notifier: NotifierService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.releaseDetailsForm = this.fb.group({
      id: [''],
      name: [''],
      details:[''],
      releaseDate: [''],
      status:['']
    });

    this.releaseId=this.activeRoute.snapshot.params.id;
    this.api.getProjectsByReleaseId(this.releaseId).subscribe((data)=>{
      this.rowData=data;
    },(error)=>{
      this.notifier.notify("error", "Something Went Wrong");
    });
    this.api.getReleaseById(this.releaseId).subscribe((data)=>{
      this.releaseDetails=data;
      this.releaseDetailsForm.patchValue({
        id:this.releaseDetails.id,
        name:this.releaseDetails.name,
        details : this.releaseDetails.details, 
        releaseDate: this.releaseDetails.releaseDate,
        status: this.releaseDetails.status})
    },(error)=>{
      this.notifier.notify("error", "Something Went Wrong");
    });
    
  }

  columnDefs = [
    { headerName:'ID',field: 'id', maxWidth: 80,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Project Name',field: 'name', width: 350,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Owner',field: 'owner', width: 100,minWidth: 135, resizable: true, sortable: true, filter: true },
    { headerName:'SME',field: 'sme', width: 100,minWidth: 135, resizable: true, sortable: true, filter: true},
    { headerName:'Description',field: 'description', width: 250,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Details',field: 'id',cellRendererFramework: AgDetailsButtonComponent, width: 130,minWidth: 100, resizable: true, sortable: true,  filter: true}
];

rowData = null;

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}

onSubmit(){

}

}
