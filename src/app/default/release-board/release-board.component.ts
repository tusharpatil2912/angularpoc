import { Component, OnInit } from '@angular/core';
import { AgReleasesettingsButtonComponent } from "../agCustomCells/ag-releasesettings-button/ag-releasesettings-button.component";
import { ProjectDetailsService } from "../../services/project-details.service";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-release-board',
  templateUrl: './release-board.component.html',
  styleUrls: ['./release-board.component.scss']
})
export class ReleaseBoardComponent implements OnInit {

  releaseList:any;
  
  constructor(private api:ProjectDetailsService,private notifier: NotifierService) {}

  ngOnInit(): void {
    this.api.getAllReleases().subscribe((data)=>{
      this.rowData = data;
    },(error)=>{
      this.notifier.notify("error", "API Error. Something Went wrong");
    });
  }
  private gridApi;
  rowSelection=false;
  Name;
  ReleaseDate;
  Details;
  Status;

  columnDefs = [
    { headerName:'ID',field: 'releaseId', maxWidth: 80,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Name',field: 'name', width: 250,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Release Date',field: 'releaseDate', width: 150,minWidth: 135, resizable: true, sortable: true, filter: true },
    { headerName:'Details',field: 'details', width: 250,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Select',field: 'select', width: 80,minWidth: 80, resizable: true, sortable: true,  filter: true, checkboxSelection: true},
    { headerName:'Settings',field: 'releaseId',cellRendererFramework: AgReleasesettingsButtonComponent, width: 80,minWidth: 80, resizable: true, sortable: true,  filter: true}
];

rowData = null;

onSelectionChanged(params) {
  this.rowSelection=true;
  var selectedRows = this.gridApi.getSelectedRows();
  // document.querySelector('#selectedRows').innerHTML =
  //   selectedRows.length === 1 ? selectedRows[0].name : '';
  this.Name=selectedRows[0].name;
  this.Details=selectedRows[0].details;
  this.ReleaseDate=selectedRows[0].releaseDate;
  this.Status=selectedRows[0].status;
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}



}
