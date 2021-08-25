import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressBarModule } from 'angular-progress-bar';


import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { SwimLanesComponent } from './swim-lanes/swim-lanes.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TasksettingsComponent } from './tasksettings/tasksettings.component';
import { AgDetailsButtonComponent } from './agCustomCells/ag-details-button/ag-details-button.component';
import { AgSettingsButtonComponent } from './agCustomCells/ag-settings-button/ag-settings-button.component';
import { AgSwimlanesButtonComponent } from './agCustomCells/ag-swimlanes-button/ag-swimlanes-button.component';
import { TasksComponent } from './tasks/tasks.component';
import { ReportsComponent } from './reports/reports.component';
import { OpenIssuesComponent } from './open-issues/open-issues.component';
import { IntegralUIModule } from '../../../node_modules/@lidorsystems/integralui-web/bin/integralui/integralui.module';
import { TaskreadonlyComponent } from './taskreadonly/taskreadonly.component';
import { TaskbuttonComponent } from './agCustomCells/taskbutton/taskbutton.component';
import { ReleaseSettingsComponent } from './release-settings/release-settings.component';
import { ReleaseCreateComponent } from './release-create/release-create.component';
import { ReleaseBoardComponent } from './release-board/release-board.component';
import { AgReleasesettingsButtonComponent } from './agCustomCells/ag-releasesettings-button/ag-releasesettings-button.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ProjectDetailsComponent,
    ProjectSettingsComponent,
    SwimLanesComponent,
    ProjectListComponent,
    TasksettingsComponent,
    AgDetailsButtonComponent,
    AgSettingsButtonComponent,
    AgSwimlanesButtonComponent,
    TasksComponent,
    ReportsComponent,
    OpenIssuesComponent,
    TaskreadonlyComponent,
    TaskbuttonComponent,
    ReleaseSettingsComponent,
    ReleaseCreateComponent,
    ReleaseBoardComponent,
    AgReleasesettingsButtonComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AgGridModule.withComponents([AgDetailsButtonComponent,AgSettingsButtonComponent,AgSwimlanesButtonComponent,TaskbuttonComponent]),
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    DragDropModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    HttpClientModule,IntegralUIModule,FormsModule,NgxChartsModule,ProgressBarModule
  ],
  providers:[
   
  ]
})
export class DefaultModule { }
