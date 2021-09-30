import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectDetailsService } from "../../services/project-details.service";
import { UserAuthService } from "../../services/user-auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {

  projectDetails;
  projectId:number;
  pId:number;
  pageTitile:string;
  submitbtnTitile:string;
  visibility = false;
  projSettingsForm: FormGroup;
  projCreatedDate;
  private gridApi;
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  //projectphase;
  allReleases;
  selectedRelease;
  resourceList;

  //months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  

  constructor(
    private fb: FormBuilder,
    private detailsapi: ProjectDetailsService,
    private userapi : UserAuthService,
    private notifier: NotifierService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId=this.activeRoute.snapshot.params.id;
    
    this.userapi.getUserstList().subscribe((data)=>{
      this.resourceList=data;   
    },(error)=>{
      console.log("failed to load users list");
    });
    
    this.detailsapi.getAllReleases().subscribe((data)=>{
      this.allReleases=data;   
    },(error)=>{
      this.allReleases={
        releaseId:-1,
        name:"Please Create Release from Release Menu First"
      }
    });
    
    if(this.projectId){
      this.pageTitile = "Project Settings";
      this.submitbtnTitile = "Update";
      this.visibility = true;
      this.detailsapi.getallocatedResourceList(this.projectId).subscribe((data)=>{
        //console.log(data);
        this.rowData = data;
      },(error)=>{
        this.notifier.notify("error","API Error. Showing Mockup Data");
      });
    this.detailsapi.getProjectDetails(this.projectId).subscribe((data)=>{
      this.projectDetails = data;
      //this.projectphase = this.projectDetails.phase;
      this.projSettingsForm.patchValue({id:this.projectDetails.id,
                                        name:this.projectDetails.name,
                                        description : this.projectDetails.description, 
                                        sme : this.projectDetails.sme, 
                                        owner:this.projectDetails.owner,
                                        codeDropDate: this.projectDetails.codeDropDate,
                                        releaseDate: this.projectDetails.releaseDate,
                                        codeFreezeDate: this.projectDetails.codeFreezeDate,
                                        createdDate:this.projectDetails.createdDate,
                                        complexity:this.projectDetails.complexity,
                                        skills:this.projectDetails.skills,
                                        releaseId:this.projectDetails.releaseId})                                    
    },(error)=>{
      this.notifier.notify("error","API Error. Showing Mockup Data");
      this.projectDetails={"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"};
      this.projSettingsForm.patchValue({id:this.projectDetails.id,
        name:this.projectDetails.name,
        description : this.projectDetails.description, 
        sme : this.projectDetails.sme, 
        owner:this.projectDetails.owner,
        releaseDate: this.projectDetails.releaseDate,
        codeDropDate: this.projectDetails.codeDropDate,
        codeFreezeDate: this.projectDetails.codeFreezeDate,
        createdDate:this.projectDetails.createdDate})
    });
    // setTimeout(() => {
    //   this.onReleaseSelection(this.projectDetails.releaseId); 
    // }, 2000);
  }
  else{
    this.pageTitile = "Add New Project";
    this.submitbtnTitile = "Submit";
  }
  this.projSettingsForm = this.fb.group({
    id: [''],
    name: [''],
    releaseDate: [''],
    codeDropDate: [''],
    codeFreezeDate: [''],
    createdDate:[this.today],
    description: [''],
    sme: [''],
    owner: [''],
    skills: [''],
    //phasemonth: [''],
    //phaseyear:['2021'],
    releaseId:[''],
    complexity:['']
  });
  this.projSettingsForm.controls['createdDate'].disable();
  this.projSettingsForm.controls['releaseDate'].disable();
  }


  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Gathering Info","Planning","Design",
  "Development","Testing"];
  public orderStatus = "Planning"

selectedReleaseDetails;
  onReleaseSelection(param){
    //this.notifier.notify("success",param);
    if (param==='0') {
      this.projSettingsForm.controls['releaseDate'].enable();
    }else{
      this.projSettingsForm.controls['releaseDate'].disable();
      this.selectedReleaseDetails = this.allReleases.filter(d => d.releaseId === parseInt(param));
      this.projSettingsForm.patchValue({releaseDate:this.selectedReleaseDetails[0].releaseDate});
  }
  }
  goBack(){
    window.history.back();
  }
  submitForm() {
    //console.warn(this.projSettingsForm.value);
    const jsonForm ={
      name:this.projSettingsForm.get('name').value,
      description:this.projSettingsForm.get('description').value,
      sme:this.projSettingsForm.get('sme').value,
      owner:this.projSettingsForm.get('owner').value,
      skills:this.projSettingsForm.get('skills').value,
      releaseId: parseInt(this.projSettingsForm.get('releaseId').value),
      releaseDate: this.projSettingsForm.get('releaseDate').value,
      codeDropDate: this.projSettingsForm.get('codeDropDate').value,
      codeFreezeDate: this.projSettingsForm.get('codeFreezeDate').value,
      complexity:this.projSettingsForm.get('complexity').value
      //,phase:this.selectedReleaseDetails[0].name
    };
    const putjsonForm ={
      id:this.projSettingsForm.get('id').value,
      name:this.projSettingsForm.get('name').value,
      description:this.projSettingsForm.get('description').value,
      sme:this.projSettingsForm.get('sme').value,
      owner:this.projSettingsForm.get('owner').value,
      skills:this.projSettingsForm.get('skills').value,
      releaseId: parseInt(this.projSettingsForm.get('releaseId').value),
      releaseDate: this.projSettingsForm.get('releaseDate').value,
      codeDropDate: this.projSettingsForm.get('codeDropDate').value,
      codeFreezeDate: this.projSettingsForm.get('codeFreezeDate').value,
      complexity:this.projSettingsForm.get('complexity').value
      //,phase:this.selectedReleaseDetails[0].name
    };
    this.pId=this.activeRoute.snapshot.params.id;
    if(this.pId){
      //this.notifier.notify("error", "add update function");
      this.detailsapi.updateProject(this.pId,putjsonForm).subscribe(
        (response) => {
          this.router.navigate(['/projectlist']).then(()=>{
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
          });
          this.notifier.notify("success", "Project updated successfully");
        },
        (error) => {this.notifier.notify("error", "Something Went Wrong While Updating Project");}
      );
      
      
    }
    else{
    this.detailsapi.addNewProject(jsonForm).subscribe(
      (response) => {
        this.router.navigate(['/projectlist']).then(()=>{
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        });
        this.notifier.notify("success", "New Project Added Successfully!");
      },
      (error) => {this.notifier.notify("error", "Something Went Wrong While Adding New Project");}
    );
    
    }
  }

  resources = [
    {'id':'1','name':'rishi','project':'3','tasks':'5','opentasks':'4'},
    {'id':'2','name':'tushar','project':'4','tasks':'8','opentasks':'2'}
  ];

  columnDefs = [
    { headerName:'ID',field: 'resourceId', maxWidth: 80,minWidth: 80, sortable: true, resizable: true, filter: true },
    { headerName:'Resourse Name',field: 'resourceName', width: 450,minWidth: 80, sortable: true,resizable: true, filter: true },
    { headerName:'# of Projects',field: 'noOfProjects', width: 150,minWidth: 80, sortable: true, resizable: true, filter: true},
    { headerName:'# of Tasks',field: 'tasksAssigned', width: 150,minWidth: 80, sortable: true, resizable: true, filter: true},
    { headerName:'# of Open Tasks', field: 'noOfTasksOpen',width: 150,minWidth: 80,  sortable: true, resizable: true, filter: true}
];

rowData;

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}

}
