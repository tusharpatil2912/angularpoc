import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from "../../services/project-details.service";
import { AgDetailsButtonComponent } from "../agCustomCells/ag-details-button/ag-details-button.component";
import { AgSettingsButtonComponent } from "../agCustomCells/ag-settings-button/ag-settings-button.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList;

  constructor(private detailsapi: ProjectDetailsService) { }

  ngOnInit(): void {
    this.detailsapi.getProjecttList().subscribe((data)=>{
      //console.log(data);
      this.projectList = data;
      this.rowData = data;
    });
  }

  columnDefs = [
    { headerName:'Project ID',field: 'id', width: 150, sortable: true, filter: true },
    { headerName:'Project Name',field: 'name', width: 650, sortable: true, filter: true },
    { headerName:'Details',field: 'id',cellRendererFramework: AgDetailsButtonComponent, width: 150, sortable: true, filter: true},
    { headerName:'Settings',field: 'id',cellRendererFramework: AgSettingsButtonComponent, width: 150, sortable: true,  filter: true}
];

rowData = null;
//  [
//   {id:'1',name:'rishi',details:'3',settings:'5'},
//   {id:'2',name:'tushar',details:'4',settings:'8'}
// ];
OnGridReady(){

}

}
