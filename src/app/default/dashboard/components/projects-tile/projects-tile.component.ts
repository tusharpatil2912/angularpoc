import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectDetailsService } from 'src/app/services/project-details.service';

@Component({
  selector: 'app-projects-tile',
  templateUrl: './projects-tile.component.html',
  styleUrls: ['./projects-tile.component.scss']
})
export class ProjectsTileComponent implements OnInit {
  ProjectList: any;
  isErrored:boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private projectService: ProjectDetailsService) { }

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList(){
    this.spinner.show('project-tile');
    this.projectService.getProjecttList().subscribe(data=>{
      this.ProjectList = data;
      this.spinner.hide('project-tile');  
      this.isErrored = false;
    },err=>{
      console.log(err);
      this.isErrored = true;
      this.spinner.hide('project-tile');
    });
  }

}
