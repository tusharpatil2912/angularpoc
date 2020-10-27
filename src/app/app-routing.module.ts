import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from "./default/default.component";
import { DashboardComponent } from "./default/dashboard/dashboard.component";
import { ProjectDetailsComponent } from "./default/project-details/project-details.component";
import { ProjectSettingsComponent } from "./default/project-settings/project-settings.component";
import { SwimLanesComponent } from "./default/swim-lanes/swim-lanes.component";
import { ProjectListComponent } from "./default/project-list/project-list.component";
import { TasksettingsComponent } from "./default/tasksettings/tasksettings.component";

const routes: Routes = [
  {
    path:'',component: DefaultComponent,
    children:[
      {path:'',component: DashboardComponent},
      {path:'project',component:ProjectDetailsComponent},
      {path:'settings',component:ProjectSettingsComponent},
      {path:'swimlanes',component:SwimLanesComponent},
      {path:'projectlist',component:ProjectListComponent},
      {path:'tasksettings', component:TasksettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
