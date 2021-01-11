import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectDetailsService } from "../../services/project-details.service";
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
  

  constructor(
    private fb: FormBuilder,
    private detailsapi: ProjectDetailsService,
    private notifier: NotifierService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.projectId=this.activeRoute.snapshot.params.id;
    if(this.projectId){
      this.pageTitile = "Project Settings";
      this.submitbtnTitile = "Update";
      this.visibility = true;
    this.detailsapi.getProjectDetails(this.projectId).subscribe((data)=>{
      //console.log(data);
      this.projectDetails = data;
      //this.projSettingsForm.get('name').setValue(this.projectDetails.name);
      //this.projCreatedDate= formatDate(this.projectDetails.createdDate, 'yyyy-MM-dd', 'en-US');
      //this.projCreatedDate= this.datePipe.transform(this.projectDetails.createdDate, 'yyyy-MM-dd');
      //console.log(this.projCreatedDate);
      this.projSettingsForm.patchValue({id:this.projectDetails.id,
                                        name:this.projectDetails.name,
                                        description : this.projectDetails.description, 
                                        sme : this.projectDetails.sme, 
                                        owner:this.projectDetails.owner,
                                        createdDate:this.projectDetails.createdDate})
    });
  }
  else{
    this.pageTitile = "Add New Project";
    this.submitbtnTitile = "Submit";
  }
  this.projSettingsForm = this.fb.group({
    id: [''],
    name: [''],
    release: [''],
    codeDropDate: [''],
    codeFreezeDate: [''],
    createdDate:[''],
    description: [''],
    sme: [''],
    owner: [''],
    projectPhase: [''],
  });
  }

  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Gathering Info","Planning","Design",
  "Development","Testing"];
  public orderStatus = "Planning"

  

  submitForm() {
    console.warn(this.projSettingsForm.value);
    var formData: any = new FormData();
    formData.append('id',this.activeRoute.snapshot.params.id);
    formData.append('name', this.projSettingsForm.get('name').value);
    formData.append('description', this.projSettingsForm.get('description').value);
    formData.append('sme', this.projSettingsForm.get('sme').value);
    formData.append('owner', this.projSettingsForm.get('owner').value);
    //console.warn(formData);
    const jsonForm ={
      name:this.projSettingsForm.get('name').value,
      description:this.projSettingsForm.get('description').value,
      sme:this.projSettingsForm.get('sme').value,
      owner:this.projSettingsForm.get('owner').value
    };
    const putjsonForm ={
      id:this.projSettingsForm.get('id').value,
      name:this.projSettingsForm.get('name').value,
      description:this.projSettingsForm.get('description').value,
      sme:this.projSettingsForm.get('sme').value,
      owner:this.projSettingsForm.get('owner').value
    };
    this.pId=this.activeRoute.snapshot.params.id;
    if(this.pId){
      //this.notifier.notify("error", "add update function");
      this.detailsapi.updateProject(this.pId,putjsonForm).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
      this.router.navigate(['/projectlist']).then(()=>{
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
      this.notifier.notify("success", "Project updated successfully");
    }
    else{
    this.detailsapi.addNewProject(jsonForm).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    //console.warn(jsonForm);
    this.router.navigate(['/projectlist']).then(()=>{
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
    // .then(() => {
    //   window.location.reload();
    // });
    this.notifier.notify("success", "New Project Added Successfully!");
    //this.notifier.notify("info", "Refreshing the List");
    }
  }

  resources = [
    {'id':'1','name':'rishi','project':'3','tasks':'5','opentasks':'4'},
    {'id':'2','name':'tushar','project':'4','tasks':'8','opentasks':'2'}
  ];

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

}
