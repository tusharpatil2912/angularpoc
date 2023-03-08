import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from "../../services/project-details.service";
import { NotifierService } from "angular-notifier";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-release-create',
  templateUrl: './release-create.component.html',
  styleUrls: ['./release-create.component.scss']
})
export class ReleaseCreateComponent implements OnInit {

  releaseDetailsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private api: ProjectDetailsService,
    private router: Router,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService) { }
    

  ngOnInit(): void {
    this.releaseDetailsForm = this.fb.group({
      id: [''],
      name: [''],
      details:[''],
      releaseDate: [''],
      status:['']
    });
  }

  onSubmit(){
    if(this.releaseDetailsForm.invalid){
      this.notifier.notify("error", "Please fill all required fields");
      Object.keys(this.releaseDetailsForm.controls).forEach(field=>{
        const control = this.releaseDetailsForm.get(field);
        control.markAsTouched({ onlySelf : true});
      })
    }else{
    this.spinner.show();
    const jsonForm ={
      name:this.releaseDetailsForm.get('name').value,
      details: this.releaseDetailsForm.get('details').value,
      releaseDate: this.releaseDetailsForm.get('releaseDate').value,
      status: this.releaseDetailsForm.get('status').value
    };

    this.api.addNewRelease(jsonForm).subscribe(
      (response) => {
        this.spinner.hide();
        this.router.navigate(['/release']);
        this.notifier.notify("success", "New Release Added Successfully!");
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        this.notifier.notify("error", "Error Occurred while adding New Release");
      }
    );
  }
  }
}
