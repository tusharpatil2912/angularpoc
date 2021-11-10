import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectDetailsService } from "../../services/project-details.service";
import { UserAuthService } from "../../services/user-auth.service";
import { MilestoneService } from "../../services/milestone.service";
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
  milestoneForm: FormGroup;
  milestones;
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
    private milestoneapi:MilestoneService,
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
      this.refeshMilestones();
      this.detailsapi.getallocatedResourceList(this.projectId).subscribe((data)=>{
        //console.log(data);
        this.rowData = data;
      },(error)=>{
        this.notifier.notify("error","Something went wrong!");
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

  this.milestoneForm = this.fb.group({
    milestoneId: [''],
    projectId: [''],
    name: [''],
    milestoneDate: [''],
    description: [''],
    status: [''],
    createdDate:['']
  });

  }

  refeshMilestones(){
    this.milestoneapi.getMilestonesByProjectId(this.projectId).subscribe((data)=>{
      this.milestones = data;
    },(error)=>{
      this.notifier.notify("error","Something went wrong!");
    });
  }

  addMilestone(){
    if(this.milestoneForm.invalid){
      this.notifier.notify("error", "Please fill all required fields");
      Object.keys(this.milestoneForm.controls).forEach(field=>{
        const control = this.milestoneForm.get(field);
        control.markAsTouched({ onlySelf : true});
      })
    }else{
      if(this.milestoneForm.get('milestoneId').value){
        //console.log('update method');
        const putMileForm = {
          milestoneId:parseInt(this.milestoneForm.get('milestoneId').value),
          projectId: parseInt(this.milestoneForm.get('projectId').value),
          name: this.milestoneForm.get('name').value,
          description: this.milestoneForm.get('description').value,
          milestoneDate: this.milestoneForm.get('milestoneDate').value
        }
        //console.log(putMileForm);
        this.milestoneapi.updateMilestone(this.milestoneForm.get('milestoneId').value,putMileForm).subscribe((data)=>{
          this.notifier.notify("success","Milestone Updated Successfully");
        //console.log(data);
        this.clearMileForm();
        this.refeshMilestones();
        },(error)=>{
          this.notifier.notify("error","Something Went Wrong while adding Milestone");
          console.log(error);
        });

      }else{
    const addMileForm = {
      projectId: parseInt(this.activeRoute.snapshot.params.id),
      name: this.milestoneForm.get('name').value,
      description: this.milestoneForm.get('description').value,
      milestoneDate: this.milestoneForm.get('milestoneDate').value
    }
    this.milestoneapi.addNewMilestone(addMileForm).subscribe(
      (data)=>{
        this.notifier.notify("success","Milestone Added Successfully");
        //console.log(data);
        this.clearMileForm();
        this.refeshMilestones();
      },(error)=>{
        this.notifier.notify("error","Something Went Wrong while adding Milestone");
        console.log(error);
      }
    );
  }
}
}

clearMileForm(){
  this.milestoneForm.reset();
}

  editMilestone(selectedMilestone){
    //console.log(selectedMilestone);
    this.milestoneForm.patchValue({id:this.projectDetails.id,
      milestoneId: selectedMilestone.milestoneId,
      projectId: selectedMilestone.projectId,
      name: selectedMilestone.name,
      milestoneDate: selectedMilestone.milestoneDate,
      description: selectedMilestone.description,
      status: selectedMilestone.status,
      createdDate:selectedMilestone.createdDate}) 
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
    if(this.projSettingsForm.invalid){
      this.notifier.notify("error", "Please fill all required fields");
      Object.keys(this.projSettingsForm.controls).forEach(field=>{
        const control = this.projSettingsForm.get(field);
        control.markAsTouched({ onlySelf : true});
      })
    }else{
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
