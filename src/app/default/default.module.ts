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
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";

import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';

import { DashboardService } from "../services/dashboard.service";
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { SwimLanesComponent } from './swim-lanes/swim-lanes.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TasksettingsComponent } from './tasksettings/tasksettings.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ProjectDetailsComponent,
    ProjectSettingsComponent,
    SwimLanesComponent,
    ProjectListComponent,
    TasksettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AgGridModule.withComponents([]),
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
    HttpClientModule
  ],
  providers:[
    DashboardService
  ]
})
export class DefaultModule { }
