import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columnDefs = [
    { field: 'id', sortable: true, filter: true },
    { field: 'name', sortable: true, filter: true },
    { field: 'settings', sortable: true, filter: true}
];

rowData = [
  {id:'1',name:'rishi',settings:'3'},
  {id:'2',name:'tushar',settings:'4'}
];

}
