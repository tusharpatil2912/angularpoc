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
import { OpenIssuesComponent } from "./default/open-issues/open-issues.component";
import { TaskreadonlyComponent } from './default/taskreadonly/taskreadonly.component';
import { LoginComponent } from "./shared/ui/login/login.component";
import { RegisterComponent } from "./shared/ui/register/register.component";
import { AuthGuardGuard } from "./services/auth-guard.guard";
import { ErrorPageComponent } from "./shared/ui/error-page/error-page.component";
import { ReleaseSettingsComponent } from "./default/release-settings/release-settings.component";
import { ReleaseCreateComponent } from "./default/release-create/release-create.component";
import { ReleaseBoardComponent } from "./default/release-board/release-board.component";

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {
    path:'',component: DefaultComponent, canActivate:[AuthGuardGuard],
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
      {path:'reports',component:ReportsComponent},
      {path:'openissues', component:OpenIssuesComponent},
      {path:'taskreadonly/:id',component:TaskreadonlyComponent},
      {path:'release',component:ReleaseBoardComponent},
      {path:'releasesettings/:id',component:ReleaseSettingsComponent},
      {path:'addrelease', component:ReleaseCreateComponent}
    ]
  },
  {path:'error',component:ErrorPageComponent},
  {path:'**',redirectTo:'/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
