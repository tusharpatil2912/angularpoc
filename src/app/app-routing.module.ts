import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from "./default/default.component";
import { DashboardComponent } from "./default/dashboard/dashboard.component";
import { ProjectDetailsComponent } from "./default/project-details/project-details.component";
import { ProjectSettingsComponent } from "./default/project-settings/project-settings.component";
import { SwimLanesComponent } from "./default/swim-lanes/swim-lanes.component";
import { ProjectListComponent } from "./default/project-list/project-list.component";
import { TasksettingsComponent } from "./default/tasksettings/tasksettings.component";
import { TasksComponent } from './default/tasks/tasks.component';
import { ReportsComponent } from "./default/reports/reports.component";
const routes: Routes = [
  {
    path:'',component: DefaultComponent,
    children:[
      {path:'',component: DashboardComponent},
      {path:'project/:id',component:ProjectDetailsComponent},
      {path:'settings/:id',component:ProjectSettingsComponent},
      {path:'addproject',component:ProjectSettingsComponent},
      //{path:'swimlanes',component:SwimLanesComponent},
      {path:'swimlanes/:id',component:SwimLanesComponent},
      {path:'projectlist',component:ProjectListComponent},
      {path:'addTask', component:TasksettingsComponent},
      {path:'taskdetails/:id', component:TasksettingsComponent},
      {path:'task', component:TasksComponent},
      {path:'reports',component:ReportsComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
