import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  TeamStatusChart=Highcharts;
  ProjectStatusChart=Highcharts;
  ActiveTasksChart=Highcharts;  

  TeamStatusChartOptions= {};
  ProjectStatusChartOptions= {};
  ActiveTasksChartOptions= {};

  @Input() data= [];

  constructor() { }

  ngOnInit(): void {

    this.TeamStatusChartOptions={
      chart: {type: 'column'},
      title: {text: 'Team Status Report'},
      exporting: {enabled: true},
      subtitle : {text: 'Latest Report'},
     legend : {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 250,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: (
           (Highcharts.theme) || 
              '#FFFFFF'), shadow: true
     },
     xAxis:{categories: ['Rishi', 'Chethan', 'Ramya', 'Sunil', 'Tushar'], title: {text: 'Employee Names'}},
     yAxis : {
        min: 0,
        title: {text: 'Tasks',align: 'high'},
        labels: {overflow: 'justify'}
     },
     tooltip : {valueSuffix: ' Tasks'},
     plotOptions : {
        column: {dataLabels: {enabled: true}},
        series: {stacking: 'normal'}
     },
     credits:{enabled: false},
     series: [
        {
           name: 'Completed',
           color:'#2e8b57',
           data: [7, 3, 6, 3, 2]
        }, 
        {
           name: 'In Progress',
           color:'#2f7ed8',
           data: [3, 5, 7, 8, 6]
        }
     ]
  };
  
  this.ProjectStatusChartOptions={
    chart: {type: 'column'},
    title: {text: 'Project Status Report'},
    exporting: {enabled: true},
    subtitle : {text: 'Latest Report'},
   legend : {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 250,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor: (
         (Highcharts.theme) || 
            '#FFFFFF'), shadow: true
   },
   xAxis:{categories: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'], title: {text: 'Projects'}},
   yAxis : {
      min: 0,
      title: {text: 'Completion',align: 'high'},
      labels: {overflow: 'justify'}
   },
   tooltip : {valueSuffix: ' %'},
   plotOptions : {
      column: {dataLabels: {enabled: true}},
      series: {stacking: 'normal'}
   },
   credits:{enabled: false},
   series: [
      {
         name: 'Completed',
         color:'#5ac18e',
         data: [70, 30, 60, 35, 82]
      }
   ]
};
 

this.ActiveTasksChartOptions={
  chart: {type: 'column'},
  title: {text: 'Active Tasks Report'},
  exporting: {enabled: true},
  subtitle : {text: 'Latest Report'},
 legend : {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 250,
    y: 100,
    floating: true,
    borderWidth: 1,
    backgroundColor: (
       (Highcharts.theme) || 
          '#FFFFFF'), shadow: true
 },
 xAxis:{categories: ['Rishi', 'Chethan', 'Ramya', 'Sunil', 'Tushar'], title: {text: 'Employee Names'}},
 yAxis : {
    min: 0,
    title: {text: 'Tasks',align: 'high'},
    labels: {overflow: 'justify'}
 },
 tooltip : {valueSuffix: ' Tasks'},
 plotOptions : {
    column: {dataLabels: {enabled: true}},
    series: {stacking: 'normal'}
 },
 credits:{enabled: false},
 series: [ 
    {
       name: 'In Progress',
       color:'#003366',
       data: [4, 5, 2, 6, 3]
    }
 ]
};

    HC_exporting(Highcharts);
    HC_exporting(this.ProjectStatusChart);
    HC_exporting(this.ActiveTasksChart);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 200);

  }

}
