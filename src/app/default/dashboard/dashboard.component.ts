import { Component, OnInit, ViewChild } from '@angular/core';
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
  project_Details = 
  [
   {id: 1, name: 'Project 1', task: "25 tasks", target: '100'},
   {id: 2, name: 'Project 2', task: "12 tasks", target: '25'},
   {id: 3, name: 'Project 3', task: "4 tasks", target: '50'},
   {id: 4, name: 'Project 4', task: "3 tasks", target: '75'},
 
 ];

}
