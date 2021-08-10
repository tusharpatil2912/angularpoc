import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AgDetailsButtonComponent } from "../agCustomCells/ag-details-button/ag-details-button.component";
import { ProjectDetailsService } from "../../services/project-details.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-release-settings',
  templateUrl: './release-settings.component.html',
  styleUrls: ['./release-settings.component.scss']
})
export class ReleaseSettingsComponent implements OnInit {

  private gridApi;
  releaseId:number;
  releaseDetails;
  releaseDetailsForm: FormGroup;
  readonly rootURL = environment.rootURL;

  constructor(private fb: FormBuilder,
    private api: ProjectDetailsService,
    private notifier: NotifierService, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.releaseDetailsForm = this.fb.group({
      releaseId: [''],
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

    this.getReleasesData();
    
  }

  columnDefs = [
    { headerName:'ID',field: 'id', maxWidth: 80,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Project Name',field: 'name', width: 350,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Owner',field: 'owner', width: 100,minWidth: 135, resizable: true, sortable: true, filter: true },
    { headerName:'SME',field: 'sme', width: 100,minWidth: 135, resizable: true, sortable: true, filter: true},
    { headerName:'Description',field: 'description', width: 250,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Details',field: 'id',cellRendererFramework: AgDetailsButtonComponent, width: 130,minWidth: 100, resizable: true, sortable: true,  filter: true}
];

getReleasesData(){
  this.api.getReleaseById(this.releaseId).subscribe((data)=>{
    this.releaseDetails=data;
    this.releaseDetailsForm.patchValue({
      releaseId:this.releaseDetails.releaseId,
      name:this.releaseDetails.name,
      details : this.releaseDetails.details, 
      releaseDate: this.releaseDetails.releaseDate,
      status: this.releaseDetails.status})
  },(error)=>{
    this.notifier.notify("error", "Something Went Wrong");
  });
}

rowData = null;

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}

onSubmit(){
  
  const jsonForm ={
    releaseId:this.releaseDetailsForm.get('releaseId').value,
    name:this.releaseDetailsForm.get('name').value,
    details: this.releaseDetailsForm.get('details').value,
    releaseDate: this.releaseDetailsForm.get('releaseDate').value,
    status: this.releaseDetailsForm.get('status').value
  };
  this.api.updateRelease(this.releaseId,jsonForm).subscribe((response) => {
      this.notifier.notify("success","Changes Saved Successfully...");
      this.getReleasesData();
    },(error) => {console.log(error)}
  );
}

public progress: number;
public message: string;
fileNameToBeSaved;
@Output() public onUploadFinished = new EventEmitter();

public uploadFile = (files,filetype) => {
  if (files.length === 0) {
    return;
  }
  let fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('files', fileToUpload, fileToUpload.name);
  this.http.post(`${this.rootURL}/Release/fileupload/${filetype}/${this.releaseDetails.releaseId}`, formData, {reportProgress: true, observe: 'events',responseType: 'text'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
        setTimeout(() => {
          this.getReleasesData();
          this.message=null;
          this.progress=null;
        }, 1000);        
      }
    });
  }
  public downloadFile=(filetype)=>{
    if (filetype==='implplan') {
      this.fileNameToBeSaved=this.releaseDetails.implementationPlan;
    }else if (filetype==='chklist'){
      this.fileNameToBeSaved=this.releaseDetails.checklist;
    }
    else if (filetype==='changetkt'){
      this.fileNameToBeSaved=this.releaseDetails.changeTicket;
    }
    else if (filetype==='vldtask'){
      this.fileNameToBeSaved=this.releaseDetails.validationTasks;
    }else {
      this.fileNameToBeSaved="file_not_found.txt";
    }
      this.notifier.notify('success',"Downloading File...");
      this.api.downloadReleaseFile(filetype,this.releaseDetails.releaseId).subscribe((data)=>{
        saveAs(new Blob([data],{type: data.type}), this.fileNameToBeSaved);
      },(error)=>{
        this.notifier.notify('error',"Something went wrong while downloading file...");
      });
  }

}
