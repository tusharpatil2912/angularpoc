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
  {position: 1, name: 'RWM', weight: 25, symbol: 'High'},
  {position: 2, name: 'Bonus', weight: 12, symbol: 'Medium'},
  {position: 3, name: 'RegBI', weight: 4, symbol: 'Medium'},
  {position: 4, name: 'InvestCloud', weight: 3, symbol: 'Low'},

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
   {id: 1, name: 'RWM', task: "25 tasks", target: '100'},
   {id: 2, name: 'Bonus', task: "12 tasks", target: '25'},
   {id: 3, name: 'RegBI', task: "4 tasks", target: '50'},
   {id: 4, name: 'InvestCloud', task: "3 tasks", target: '75'},
 
 ];

}
