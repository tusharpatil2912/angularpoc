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
    { headerName:'Project Name',field: 'name', width: 650,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Tasks',field: 'phase', width: 150,minWidth: 135, resizable: true, sortable: true, filter: true },
    { headerName:'Open Tasks',field: 'id', width: 150,minWidth: 135, resizable: true, sortable: true, filter: true},
    { headerName:'Details',field: 'id', width: 150,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Settings',field: 'id', width: 150,minWidth: 80, resizable: true, sortable: true,  filter: true}
];

rowData = null;

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}
}
