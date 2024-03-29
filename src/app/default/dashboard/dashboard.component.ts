/*import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Project 1', weight: 25, symbol: 'High'},
  {position: 2, name: 'Project 2', weight: 12, symbol: 'Medium'},
  {position: 3, name: 'Project 3', weight: 4, symbol: 'Medium'},
  {position: 4, name: 'Project 4', weight: 3, symbol: 'Low'},

];

 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart=[];
  pieChart=[];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.bigChart=this.dashboardService.bigChart();
    this.pieChart=this.dashboardService.pieChart();
    this.dataSource.paginator = this.paginator;
  }

  printComponent(cmpName) {
    //debugger;
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
}

  project_Details = 
  [
   {id: 1, name: 'Project 1', task: "25 tasks", target: '100'},
   {id: 2, name: 'Project 2', task: "12 tasks", target: '25'},
   {id: 3, name: 'Project 3', task: "4 tasks", target: '50'},
   {id: 4, name: 'Project 4', task: "3 tasks", target: '75'},
 
 ];

}*/

import { Component, OnInit } from '@angular/core';
import { projectComplexeity,ResourceAllocated,ProjectDataMulti,EstimatedTime,TasksCompleted,ProjectStatus,CodeRelease,TasksInProgress } from '../../services/dashboard.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  projectComplexeity:any[];
  ResourceAllocated:any[];
  ProjectDataMulti:any[];
  EstimatedTime:any[];
  TasksCompleted:any[];
  ProjectStatus:any[];
  CodeRelease:any[];
  TasksInProgress:any[];
  view:any[]=[300,310];
  viewPie:any[]=[350,200];
  viewHorizontalChart:any[]=[350,200];
  colorScheme={
    domain:['#76D7C4','#76448A','#D35400','#16A085']
  };
  schemeType: string='ordinal';
  gradient: boolean=true;
  xAxis: boolean=true;
  yAxis: boolean=true;
  legendTitle: string='Resources Allocated & Project Complexeity';
  legendTitleMulti: string='Projects';
  legendPosition: string='below';
  legend: boolean=true;
  showXAxisLabel: boolean=true;
  showYAxisLabel: boolean=true;
  yAxisLabel: string='Resource Allocated & Project Complexeity';
  xAxisLabel: string='Projects';
  animations: boolean=true;
  showGridLines: boolean=false;
  showDataLabel: boolean=false;
  showDataLabelPie: boolean=true;
  barPadding: number=3;
  tooltipDisabled: boolean=false;
  roundEdges: boolean=false;
  legendTitleLineChart: string='Estimated Time For Each Project';
  legendTitleMultiLineChart: string='Projects';
  legendPositionLineChart: string='below';
  yAxisLabelLineChart: string='Estimated Time (in Hrs)';
  colorSchemeLineChart={
    domain:['#52BE80','#AF7AC5','#F9E79F','#148F77']
  };
  colorSchemePieChart={
    domain:['#58D68D','#5DADE2','#D68910','#283747']
  };
  colorSchemePieChartProjectStatus={
    domain:['#F7DC6F','#7FB3D5','#7DCEA0','#48C9B0']
  };
  colorSchemeCodeRelease={
    domain:['#2E86C1','#E67E22','#1D8348','#78281F']
  };
  colorSchemeTasksInProgress={
    domain:['#34495E','#CB4335','#117A65','#6C3483']
  };
  legendTitlePieChart: string='Tasks Remaining';
  legendTitlePieChartProjectStatus: string='Project Status';
  legendTitleCodeRelease: string='Code Release & Tasks Remaining';
  xAxisLabelCodeRelease:string='Tasks Remaining & Code Release Month';
  yAxisLabelCodeRelease:string='Projects';
  yAxisLabelTasksInProgress:string='Tasks In Progress & Not Started';




  constructor() { Object.assign(this, {projectComplexeity,ResourceAllocated,ProjectDataMulti,EstimatedTime,TasksCompleted,ProjectStatus,CodeRelease,TasksInProgress})}

  ngOnInit(): void {
  }

}

