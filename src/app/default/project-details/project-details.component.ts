import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectDetailsService } from "../../services/project-details.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  projectDetails:any;
  projectId:number;

  constructor(private detailsapi: ProjectDetailsService, 
              private router: Router,
              private activeRoute: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.projectId=this.activeRoute.snapshot.params.id;
    this.detailsapi.getProjectDetails(this.projectId).subscribe((data)=>{
      //console.log(data);
      this.projectDetails = data;
    });
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
    { headerName:'ID',field: 'id', width: 150, sortable: true, filter: true },
    { headerName:'Resourse Name',field: 'name', width: 350, sortable: true, filter: true },
    { headerName:'# of Projects',field: 'project', width: 150, sortable: true, filter: true},
    { headerName:'# of Tasks',field: 'tasks', width: 150, sortable: true, filter: true},
    { headerName:'# of Open Tasks', field: 'opentasks',width: 150,  sortable: true, filter: true},
    { headerName:'Remove', field: 'remove', width: 150, sortable: true, filter: true}
];

rowData = [
  {id:'1',name:'rishi',project:'3',tasks:'5',opentasks:'4',remove:'Remove'},
  {id:'2',name:'tushar',project:'4',tasks:'8',opentasks:'2',remove:'Remove'},
  {id:'3',name:'chethan',project:'2',tasks:'7',opentasks:'3',remove:'Remove'}
];

//file upload code

public progress: number;
public message: string;
@Output() public onUploadFinished = new EventEmitter();

public uploadFile = (files) => {
  if (files.length === 0) {
    return;
  }
  let fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('files', fileToUpload, fileToUpload.name);
  this.http.post('http://localhost/newwebapi/api/FileUpload', formData, {reportProgress: true, observe: 'events',responseType: 'text'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    });
}

}
