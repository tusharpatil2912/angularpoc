import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskDetailsService } from "../../services/task-details.service";
import { ProjectDetailsService } from "../../services/project-details.service";
import { UserAuthService } from "../../services/user-auth.service";
import { MilestoneService } from "../../services/milestone.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NotifierService } from "angular-notifier";
import { saveAs } from "file-saver";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-tasksettings',
  templateUrl: './tasksettings.component.html',
  styleUrls: ['./tasksettings.component.scss']
})
export class TasksettingsComponent implements OnInit {

  private gridApi;
  projectDetails;
  projectsList;
  milestoneList:any;
  taskDetail:any;
  projectId: number;
  pId: number;
  pageTitile: string;
  submitbtnTitile: string;
  visibility = false;
  taskSettingsForm: FormGroup;
  taskId: number;
  tId: number;
  reviewNeeded=false;
  resourceList;
  qpProjectId;


  constructor(
    private fb: FormBuilder,
    private detailsapi: TaskDetailsService,
    private projectApi: ProjectDetailsService,
    private milestoneApi: MilestoneService,
    private notifier: NotifierService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private userApi: UserAuthService) { }
    
  ngOnInit(): void {
    this.activeRoute.queryParams
    .subscribe(params => {
      this.qpProjectId = params.projectId;
    }
  );
    this.taskSettingsForm = this.fb.group({
      taskId: [''],
      projectId: [''],
      resourceId: [''],
      taskName: [''],
      subTaskName: [''],
      taskSME: [''],
      taskOwner: [''],
      taskSkills: [''],
      taskStatus: [''],
      taskDetails: [''],
      empId: [''],
      taskCreatedDate: [''],
      taskCompletedDate: [''],
      milestoneId: [''],
      taskWeightage: [''],
      taskETA: [''],
      taskETC: [''],
      documentName: [''],
      reviewFlag:[''],
      reviewComments:[''],
      resourceName:[''],
      reviewerId:['0']
    });
    this.refreshAllData();
  }

  columnDefs = [
    { headerName:'ID',field: 'resourceId', maxWidth: 80,minWidth: 80, sortable: true, resizable: true, filter: true },
    { headerName:'Name',field: 'resourceName', width: 450,minWidth: 80, sortable: true,resizable: true, filter: true },
    { headerName:'Resource Skills',field: 'resourceSkills', width: 200,minWidth: 100, sortable: true, resizable: true, filter: true},
    { headerName:'# of Projects',field: 'noOfProjects', width: 150,minWidth: 80, sortable: true, resizable: true, filter: true},
    { headerName:'# of Tasks',field: 'tasksAssigned', width: 150,minWidth: 80, sortable: true, resizable: true, filter: true},
    { headerName:'# of Open Tasks', field: 'noOfTasksOpen',width: 150,minWidth: 80,  sortable: true, resizable: true, filter: true},
    { headerName: 'Select', field: 'checkboxSelect', width: 150, minWidth: 100, resizable: true, sortable: true, filter: true, checkboxSelection: true }
];

// [
//   { headerName: 'Sl no', field: 'resourceId', width: 100, minWidth: 100, resizable: true, sortable: true, filter: true },
//   { headerName: 'Name', field: 'name', width: 200, minWidth: 100, resizable: true, sortable: true, filter: true },
//   { headerName: 'Project', field: 'resourceId', width: 400, minWidth: 100, resizable: true, sortable: true, filter: true },
//   { headerName: 'Task', field: 'resourceId', width: 150, minWidth: 100, resizable: true, sortable: true, filter: true },
//   { headerName: 'Open Task', field: 'resourceId', width: 150, minWidth: 100, resizable: true, sortable: true, filter: true },
//   { headerName: 'Skills', field: 'resourceId', width: 150, minWidth: 100, resizable: true, sortable: true, filter: true },
//   { headerName: 'Select', field: 'checkboxSelect', width: 150, minWidth: 100, resizable: true, sortable: true, filter: true, checkboxSelection: true }
// ]

  rowData;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  goBack(){
    window.history.back();
  }
  onResourceSelection(params){
    this.gridApi = params.api;
    var selectedRows = this.gridApi.getSelectedRows();
    this.taskSettingsForm.patchValue({
      resourceId: selectedRows[0].resourceId
    });
  }

  getMilestoneList(){
    this.milestoneApi.getMilestonesByProjectId(this.taskSettingsForm.get('projectId').value).subscribe(
      (data)=>{this.milestoneList=data},
      (error)=>{this.milestoneList=[{"milestoneId": 0,"projectId": 0,"name": "Failed to Load Milestones, Select Project again"}];
    console.log(error);});
  }

  reviewCheck(){
    this.reviewNeeded = this.taskSettingsForm.get('reviewFlag').value;
  }

  refreshAllData(){
    this.projectApi.getProjecttList().subscribe((data) => {
      this.projectsList = data;
    }, (error) => {
      console.log("failed to load projects list");
    });

    this.userApi.getUserstList().subscribe((data) => {
      this.resourceList = data;
      this.rowData = data;
    }, (error) => {
      console.log("failed to load resource list");
    });
    this.taskId = this.activeRoute.snapshot.params.id;
    if (this.taskId) {
      this.pageTitile = "Task Settings";
      this.submitbtnTitile = "Update";
      this.visibility = true;
      this.detailsapi.getTaskById(this.taskId).subscribe((data) => {
        this.taskDetail = data;
        this.taskSettingsForm.patchValue({
          taskId: this.taskId,
          projectId: this.taskDetail.projectId,
          resourceId: this.taskDetail.resourceId,
          taskName: this.taskDetail.taskName,
          subTaskName: this.taskDetail.subTaskName,
          taskSME: this.taskDetail.taskSME,
          taskOwner: this.taskDetail.taskOwner,
          taskSkills: this.taskDetail.taskSkills,
          taskStatus: this.taskDetail.taskStatus,
          taskDetails: this.taskDetail.taskDetails,
          empId: this.taskDetail.empId,
          taskCreatedDate: this.taskDetail.taskCreatedDate,
          taskCompletedDate: this.taskDetail.taskCompletedDate,
          milestoneId: this.taskDetail.milestoneId,
          taskWeightage: this.taskDetail.taskWeightage,
          taskETA: this.taskDetail.taskETA,
          taskETC: this.taskDetail.taskETC,
          reviewFlag: Boolean(this.taskDetail.reviewFlag=="true"),
          reviewComments: this.taskDetail.reviewComments,
          resourceName:this.taskDetail.resourceName,
          reviewerId:this.taskDetail.reviewerId
        })
        this.getMilestoneList();
        this.reviewCheck();
      }, (error) => {
        this.notifier.notify("error", "Internal Server error occured");
      });
    }
    else {
      this.pageTitile = "New Task";
      this.submitbtnTitile = "Submit";
      if(this.qpProjectId!=null){
        this.taskSettingsForm.patchValue({
          projectId: this.qpProjectId
        })
        this.getMilestoneList();
      }
    }
  }


  ///file upload and download
readonly rootURL = environment.rootURL;
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
  this.http.post(`${this.rootURL}/ProjectTask/fileupload/${this.taskDetail.taskId}`, formData, {reportProgress: true, observe: 'events',responseType: 'text'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
        setTimeout(() => {
          this.refreshAllData();
          this.message=null;
          this.progress=null;
        }, 1000);        
      }
    });
  }
  public downloadFile=(filetype)=>{
    if (filetype==='doc') {
      this.fileNameToBeSaved=this.taskDetail.documentName;
    }else {
      this.fileNameToBeSaved="file_not_found.txt";
    }
      this.notifier.notify('success',"Downloading File...");
      this.detailsapi.downloadTaskFile(this.taskDetail.taskId).subscribe((data)=>{
        saveAs(new Blob([data],{type: data.type}), this.fileNameToBeSaved);
      },(error)=>{
        this.notifier.notify('error',"Something went wrong while downloading file...");
      });
  }

  submitForm() {
    const jsonForm ={
      projectId : parseInt(this.taskSettingsForm.get('projectId').value),
      resourceId : parseInt(this.taskSettingsForm.get('resourceId').value),
      taskName: this.taskSettingsForm.get('taskName').value,
      subTaskName: this.taskSettingsForm.get('subTaskName').value,
      taskSME: this.taskSettingsForm.get('taskSME').value,
      taskOwner: this.taskSettingsForm.get('taskOwner').value,
      taskSkills: this.taskSettingsForm.get('taskSkills').value,
      taskStatus: this.taskSettingsForm.get('taskStatus').value,
      taskDetails: this.taskSettingsForm.get('taskDetails').value,
      empId: this.taskSettingsForm.get('empId').value,
      //taskCreatedDate: this.taskSettingsForm.get('taskCreatedDate').value,
      //taskCompletedDate: this.taskSettingsForm.get('taskCompletedDate').value,
      milestoneId: this.taskSettingsForm.get('milestoneId').value,
      taskWeightage: this.taskSettingsForm.get('taskWeightage').value,
      taskETA: this.taskSettingsForm.get('taskETA').value,
      taskETC: this.taskSettingsForm.get('taskETC').value,
      reviewFlag: this.taskSettingsForm.get('reviewFlag').value+"",
      reviewComments: this.taskSettingsForm.get('reviewComments').value,
      reviewerId: parseInt(this.taskSettingsForm.get('reviewerId').value)
    };
    const updateJsonForm ={
      taskId : parseInt(this.activeRoute.snapshot.params.id),
      projectId : parseInt(this.taskSettingsForm.get('projectId').value),
      resourceId : parseInt(this.taskSettingsForm.get('resourceId').value),
      taskName: this.taskSettingsForm.get('taskName').value,
      subTaskName: this.taskSettingsForm.get('subTaskName').value,
      taskSME: this.taskSettingsForm.get('taskSME').value,
      taskOwner: this.taskSettingsForm.get('taskOwner').value,
      taskSkills: this.taskSettingsForm.get('taskSkills').value,
      taskStatus: this.taskSettingsForm.get('taskStatus').value,
      taskDetails: this.taskSettingsForm.get('taskDetails').value,
      empId: this.taskSettingsForm.get('empId').value,
      //taskCreatedDate: this.taskSettingsForm.get('taskCreatedDate').value,
      //taskCompletedDate: this.taskSettingsForm.get('taskCompletedDate').value,
      milestoneId: this.taskSettingsForm.get('milestoneId').value,
      taskWeightage: this.taskSettingsForm.get('taskWeightage').value,
      taskETA: this.taskSettingsForm.get('taskETA').value,
      taskETC: this.taskSettingsForm.get('taskETC').value,
      reviewFlag: this.taskSettingsForm.get('reviewFlag').value+"",
      reviewComments: this.taskSettingsForm.get('reviewComments').value,
      reviewerId: parseInt(this.taskSettingsForm.get('reviewerId').value)
    };
    this.tId = this.activeRoute.snapshot.params.id;
    if(this.tId){
      this.detailsapi.updateTask(this.tId,updateJsonForm).subscribe(
        (response) => {
          this.router.navigate(['/task']).then(()=>{
          });
          this.notifier.notify("success", "Task updated successfully");
        },
        (error) => {this.notifier.notify("error", "Something Went Wrong While Updating the Task");}
      );  
      //console.warn(this.taskSettingsForm.value);   
    }
    else{
    this.detailsapi.addNewTask(jsonForm).subscribe(
      (response) => {
        this.router.navigate(['/task']).then(()=>{
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        });
        this.notifier.notify("success", "New Task Added Successfully!");
      },
      (error) => {this.notifier.notify("error", "Something Went Wrong While Adding New Task");}
    );
  }

}
}