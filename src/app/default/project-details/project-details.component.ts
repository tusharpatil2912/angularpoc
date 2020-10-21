import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
