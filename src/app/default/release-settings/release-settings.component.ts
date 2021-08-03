import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-settings',
  templateUrl: './release-settings.component.html',
  styleUrls: ['./release-settings.component.scss']
})
export class ReleaseSettingsComponent implements OnInit {

  private gridApi;

  constructor() { }

  ngOnInit(): void {
  }

  columnDefs = [
    { headerName:'ID',field: 'id', maxWidth: 80,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Project Name',field: 'name', width: 350,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Tasks',field: 'tasks', width: 150,minWidth: 135, resizable: true, sortable: true, filter: true },
    { headerName:'Open Tasks',field: 'opentasks', width: 150,minWidth: 135, resizable: true, sortable: true, filter: true},
    { headerName:'Details',field: 'details', width: 250,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Select',field: 'select', width: 80,minWidth: 80, resizable: true, sortable: true,  filter: true, checkboxSelection: true}
];

rowData = [
  {id:'1',name:'Project 1',details:'ABC',tasks:'5',opentasks:'4',select:''},
  {id:'2',name:'Project 2',details:'ABC',tasks:'8',opentasks:'2',select:''},
  {id:'3',name:'Project 3',details:'ABC',tasks:'7',opentasks:'3',select:''}
];

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}
}
