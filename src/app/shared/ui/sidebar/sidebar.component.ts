import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProjectDetailsService } from "../../../services/project-details.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  projectList;

  constructor(private routes : Router,public dialog: MatDialog,private detailsapi: ProjectDetailsService) { }

  ngOnInit(): void {
    this.detailsapi.getProjecttList().subscribe((data)=>{
      //console.log(data);
      this.projectList = data;
      //this.rowData = data;
    });
  }

  OnHomePageLoad()
  {
    //alert("My dashboard content 123");
    this.routes.navigate(['/dashboard']);
  }
  Dashboard(){
    //alert("My dashboard content");
   //this.router.navigate(['/employees']);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(SelectProjectDialog, {
      width: 'auto',
      data: { name: this.projectList}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

@Component({
  selector: 'select-project-dialog',
  templateUrl: 'select-project-dialog.html',
})
export class SelectProjectDialog {

  constructor(
    public dialogRef: MatDialogRef<SelectProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}