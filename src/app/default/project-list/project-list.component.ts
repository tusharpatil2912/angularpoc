import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from "../../services/project-details.service";

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
      console.log(data);
      this.projectList = data;
    });
  }

rowData = [
  {id:'1',name:'rishi',release:'Dec20',settings:'3'},
  {id:'2',name:'tushar',release:'Dec20',settings:'4'}
];

}
