import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = 'Project Status';

  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Gathering Info","Planning","Design",
  "Development","Testing"];
  public orderStatus = "Planning"

  projSettingsForm = new FormGroup({
    name: new FormControl(''),
    release: new FormControl(''),
    codeDropDate: new FormControl(''),
    codeFreezeDate: new FormControl(''),
    sme: new FormControl(''),
    owner: new FormControl(''),
    projectPhase: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.projSettingsForm.value);
  }

  resources = [
    {'id':'1','name':'rishi','project':'3','tasks':'5','opentasks':'4'},
    {'id':'2','name':'tushar','project':'4','tasks':'8','opentasks':'2'}
  ];

  columnDefs = [
    { field: 'id', sortable: true, filter: true },
    { field: 'name', sortable: true, filter: true },
    { field: 'project', sortable: true, filter: true},
    { field: 'tasks', sortable: true, filter: true},
    { field: 'opentasks', sortable: true, filter: true}
];

rowData = [
  {id:'1',name:'rishi',project:'3',tasks:'5',opentasks:'4'},
  {id:'2',name:'tushar',project:'4',tasks:'8',opentasks:'2'}
];

}
