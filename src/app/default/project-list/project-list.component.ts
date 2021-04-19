import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from "../../services/project-details.service";
import { AgDetailsButtonComponent } from "../agCustomCells/ag-details-button/ag-details-button.component";
import { AgSettingsButtonComponent } from "../agCustomCells/ag-settings-button/ag-settings-button.component";
import { AgSwimlanesButtonComponent } from "../agCustomCells/ag-swimlanes-button/ag-swimlanes-button.component";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList;
  private gridApi;
  mockupprojectList=[{"id":1,"name":"My First Project","description":"Desc 1","owner":"Owner 1","sme":"Sme 1","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-26"},{"id":2,"name":"My Second Project","description":"Desc 2","owner":"Owner 2","sme":"Sme 2","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-11-27"},{"id":3,"name":"My Third Project","description":"Desc 3","owner":"Owner 3","sme":"Sme 3","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-12-01"},{"id":4,"name":"My Fourth Project","description":"Desc 4","owner":"Owner 4","sme":"Sme 4","phase":null,"codeDropDate":null,"codeFreezeDate":null,"releaseDate":null,"createdDate":"2020-12-01"}];

  constructor(private detailsapi: ProjectDetailsService,private notifier: NotifierService,) { }

  ngOnInit(): void {
    this.detailsapi.getProjecttList().subscribe((data)=>{
      //console.log(data);
      this.projectList = data;
      this.rowData = data;
    },(error)=>{
      this.rowData=this.mockupprojectList;
      this.notifier.notify("error", "API Error. Showing Mockup Data");
    });
  }

  columnDefs = [
    { headerName:'ID',field: 'id', maxWidth: 80,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Project Name',field: 'name', width: 650,minWidth: 80, resizable: true, sortable: true, filter: true },
    { headerName:'Details',field: 'id',cellRendererFramework: AgDetailsButtonComponent, width: 150,minWidth: 135, resizable: true, sortable: true, filter: true},
    { headerName:'Task Swimlanes',field: 'id',cellRendererFramework: AgSwimlanesButtonComponent, width: 150,minWidth: 145, resizable: true, sortable: true, filter: true},
    { headerName:'Settings',field: 'id',cellRendererFramework: AgSettingsButtonComponent, width: 150,minWidth: 80, resizable: true, sortable: true,  filter: true}
];

rowData = null;
//  [
//   {id:'1',name:'rishi',details:'3',settings:'5'},
//   {id:'2',name:'tushar',details:'4',settings:'8'}
// ];

onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
}


}
