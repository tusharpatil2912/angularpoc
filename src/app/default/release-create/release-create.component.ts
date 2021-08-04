import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from "../../services/project-details.service";
import { NotifierService } from "angular-notifier";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    private notifier: NotifierService) { }

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
    const jsonForm ={
      name:this.releaseDetailsForm.get('name').value,
      details: this.releaseDetailsForm.get('details').value,
      releaseDate: this.releaseDetailsForm.get('releaseDate').value,
      status: this.releaseDetailsForm.get('status').value
    };

    this.api.addNewRelease(jsonForm).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.router.navigate(['/release']).then(()=>{
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    this.notifier.notify("success", "New Release Added Successfully!");
  }

}
