import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectDetailsService } from "../../services/project-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NotifierService } from "angular-notifier";
import { saveAs } from "file-saver";
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  private gridApi;
  projectDetails:any;
  projectId:number;
  readonly rootURL = environment.rootURL;

  constructor(private detailsapi: ProjectDetailsService, 
              private router: Router,
              private notifier:NotifierService,
              private activeRoute: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjectData();
  }

  projectName = 'MyApp';
  ownerName = 'Pallavi';
  smeName ='Arpan';

  createdDate = '15 July 2020';
  codeFreezeDate = '18 Sep 2020';
  releaseDate = '19 Sep 2020';

  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Gathering Info","Planning","Design",
  "Development","Testing"];
  public orderStatus = "Planning"

  resources = [
    {'id':'1','name':'rishi','project':'3','tasks':'5','opentasks':'4'},
    {'id':'2','name':'tushar','project':'4','tasks':'8','opentasks':'2'}
  ]

  columnDefs = [
    { headerName:'ID',field: 'id', maxWidth: 80,minWidth: 80, sortable: true, resizable: true, filter: true },
    { headerName:'Resourse Name',field: 'name', width: 500,minWidth: 80, sortable: true,resizable: true, filter: true },
    { headerName:'# of Projects',field: 'project', width: 150,minWidth: 80, sortable: true, resizable: true, filter: true},
    { headerName:'# of Tasks',field: 'tasks', width: 150,minWidth: 80, sortable: true, resizable: true, filter: true},
    { headerName:'# of Open Tasks', field: 'opentasks',width: 150,minWidth: 80,  sortable: true, resizable: true, filter: true},
    { headerName:'Remove', field: 'remove', width: 150,minWidth: 80, sortable: true, resizable: true, filter: true}
];

rowData = [
  {id:'1',name:'rishi',project:'3',tasks:'5',opentasks:'4',remove:'Remove'},
  {id:'2',name:'tushar',project:'4',tasks:'8',opentasks:'2',remove:'Remove'},
  {id:'3',name:'chethan',project:'2',tasks:'7',opentasks:'3',remove:'Remove'}
];

//file upload code

// public progress: number;
// public message: string;
// @Output() public onUploadFinished = new EventEmitter();

// public uploadFile = (files) => {
//   if (files.length === 0) {
//     return;
//   }
//   let fileToUpload = <File>files[0];
//   const formData = new FormData();
//   formData.append('files', fileToUpload, fileToUpload.name);
//   this.http.post('http://localhost/latestapi/api/FileUpload', formData, {reportProgress: true, observe: 'events',responseType: 'text'})
//     .subscribe(event => {
//       if (event.type === HttpEventType.UploadProgress)
//         this.progress = Math.round(100 * event.loaded / event.total);
//       else if (event.type === HttpEventType.Response) {
//         this.message = 'Upload success.';
//         this.onUploadFinished.emit(event.body);
//       }
//     });
// }

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}

getProjectData(){
  this.projectId=this.activeRoute.snapshot.params.id;
  this.detailsapi.getProjectDetails(this.projectId).subscribe((data)=>{
    //console.log(data);
    this.projectDetails = data;
  },(error)=>{
    this.notifier.notify("error","API Error. Showing Mockup Data");
    this.projectDetails={"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"};
  });
}

///file upload and download

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
  this.http.post(`${this.rootURL}/Project/fileupload/${filetype}/${this.projectDetails.id}`, formData, {reportProgress: true, observe: 'events',responseType: 'text'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
        setTimeout(() => {
          this.getProjectData();
          this.message=null;
          this.progress=null;
        }, 1000);        
      }
    });
  }
  public downloadFile=(filetype)=>{
    if (filetype==='afd') {
      this.fileNameToBeSaved=this.projectDetails.afd;
    }else if (filetype==='tsd'){
      this.fileNameToBeSaved=this.projectDetails.tsd;
    }
    else if (filetype==='runbook'){
      this.fileNameToBeSaved=this.projectDetails.runbook;
    }
    else if (filetype==='unittest'){
      this.fileNameToBeSaved=this.projectDetails.unitTestDoc;
    }
    else if (filetype==='scripts'){
      this.fileNameToBeSaved=this.projectDetails.scripts;
    }else {
      this.fileNameToBeSaved="file_not_found.txt";
    }
      this.notifier.notify('success',"Downloading File...");
      this.detailsapi.downloadProjectFile(filetype,this.projectDetails.id).subscribe((data)=>{
        saveAs(new Blob([data],{type: data.type}), this.fileNameToBeSaved);
      },(error)=>{
        this.notifier.notify('error',"Something went wrong while downloading file...");
      });
  }

}
