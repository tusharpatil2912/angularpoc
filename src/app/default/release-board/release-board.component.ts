import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AgReleasesettingsButtonComponent } from "../agCustomCells/ag-releasesettings-button/ag-releasesettings-button.component";
import { ProjectDetailsService } from "../../services/project-details.service";
import { NotifierService } from "angular-notifier";
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { saveAs } from "file-saver";

@Component({
  selector: 'app-release-board',
  templateUrl: './release-board.component.html',
  styleUrls: ['./release-board.component.scss']
})
export class ReleaseBoardComponent implements OnInit {

  releaseList:any;
  readonly rootURL = environment.rootURL;

  constructor(private api:ProjectDetailsService,
    private notifier: NotifierService,
    private http:HttpClient) {}

  ngOnInit(): void {
    this.getAllReleasesData();
  }

  getAllReleasesData(){
    this.api.getAllReleases().subscribe((data)=>{
      this.rowData = data;
    },(error)=>{
      this.notifier.notify("error", "API Error. Something Went wrong");
    });
  }

  private gridApi;
  rowSelection=false;
  selectedRowData;
  fileNameToBeSaved;
  

  columnDefs = [
    { headerName:'ID',field: 'releaseId', maxWidth: 80,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Name',field: 'name', width: 250,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Release Date',field: 'releaseDate', width: 150,minWidth: 135, resizable: true, sortable: true, filter: true },
    { headerName:'Details',field: 'details', width: 250,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Select',field: 'select', width: 80,minWidth: 80, resizable: true, sortable: true,  filter: true, checkboxSelection: true},
    { headerName:'Settings',field: 'releaseId',cellRendererFramework: AgReleasesettingsButtonComponent, width: 80,minWidth: 80, resizable: true, sortable: true,  filter: true}
];

rowData = null;

onSelectionChanged(params) {
  if(params==='refresh'){
    this.rowSelection=false;
    this.progress=null;
    this.message=null;
  } else{
  this.rowSelection=true;}
  var selectedRows = this.gridApi.getSelectedRows();
  this.selectedRowData=selectedRows[0];  
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}

public progress: number;
public message: string;
@Output() public onUploadFinished = new EventEmitter();

public uploadFile = (files,filetype) => {
  if (files.length === 0) {
    return;
  }
  let fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('files', fileToUpload, fileToUpload.name);
  this.http.post(`${this.rootURL}/Release/fileupload/${filetype}/${this.selectedRowData.releaseId}`, formData, {reportProgress: true, observe: 'events',responseType: 'text'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
        this.getAllReleasesData();
        setTimeout(() => {
          this.onSelectionChanged('refresh');
        }, 1000);        
      }
    });
  }
  public downloadFile=(filetype)=>{
    if (filetype==='implplan') {
      this.fileNameToBeSaved=this.selectedRowData.implementationPlan;
    }else if (filetype==='chklist'){
      this.fileNameToBeSaved=this.selectedRowData.checklist;
    }
    else if (filetype==='changetkt'){
      this.fileNameToBeSaved=this.selectedRowData.changeTicket;
    }
    else if (filetype==='vldtask'){
      this.fileNameToBeSaved=this.selectedRowData.validationTasks;
    }else {
      this.fileNameToBeSaved="file_not_found.txt";
    }
      this.notifier.notify('success',"Downloading File...");
      this.api.downloadReleaseFile(filetype,this.selectedRowData.releaseId).subscribe((data)=>{
        saveAs(new Blob([data],{type: data.type}), this.fileNameToBeSaved);
      },(error)=>{
        this.notifier.notify('error',"Something went wrong while downloading file...");
      });
  }
}

