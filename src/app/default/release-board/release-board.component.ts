import { Component, OnInit } from '@angular/core';
import { AgReleasesettingsButtonComponent } from "../agCustomCells/ag-releasesettings-button/ag-releasesettings-button.component";

@Component({
  selector: 'app-release-board',
  templateUrl: './release-board.component.html',
  styleUrls: ['./release-board.component.scss']
})
export class ReleaseBoardComponent implements OnInit {

  
  constructor() {}

  ngOnInit(): void {
  }
  private gridApi;
  rowSelection=false;
  Name;
  ReleaseDate;
  Details;

  columnDefs = [
    { headerName:'ID',field: 'id', maxWidth: 80,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Name',field: 'name', width: 250,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Release Date',field: 'releasedate', width: 150,minWidth: 135, resizable: true, sortable: true, filter: true },
    { headerName:'Details',field: 'details', width: 250,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Select',field: 'select', width: 80,minWidth: 80, resizable: true, sortable: true,  filter: true, checkboxSelection: true},
    { headerName:'Settings',field: 'id',cellRendererFramework: AgReleasesettingsButtonComponent, width: 80,minWidth: 80, resizable: true, sortable: true,  filter: true}
];

rowData = [
  {id:'1',name:'Release 1',details:'ABC',releasedate:'5',select:''},
  {id:'2',name:'Release 2',details:'ABC',releasedate:'8',select:''},
  {id:'3',name:'Release 3',details:'ABC',releasedate:'7',select:''}
];

onSelectionChanged(params) {
  this.rowSelection=true;
  var selectedRows = this.gridApi.getSelectedRows();
  // document.querySelector('#selectedRows').innerHTML =
  //   selectedRows.length === 1 ? selectedRows[0].name : '';
  this.Name=selectedRows[0].name;
  this.Details=selectedRows[0].details;
  this.ReleaseDate=selectedRows[0].releasedate;
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}



}
