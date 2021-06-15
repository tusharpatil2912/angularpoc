import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from "../../../services/user-auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error =null;
  usermsg = null;
  myalert="alert alert-primary";
  clicked = false;
  registerForm: FormGroup;
  checkUsername = "refresh";
  managers:any;
  mngData:any;

  constructor(
    private fb: FormBuilder,
    private loginApi: UserAuthService, 
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname:[''],
      lastname:[''],
      role:[''],
      managerid:['0'],
      username: [''],
      password: [''],
      skills:['']
    });

    this.loginApi.getByDesignation("teamlead").subscribe((data)=>{
      this.managers=data;
      //console.log(this.managers);
    },(error)=> {
      this.managers={
        resourseId : 0,
        resourseName : "No Managers Registerd"
      };
    })
  }
  submitForm(){
    this.clicked = true;
    const jsonForm ={
      username:this.registerForm.get('username').value,
      password:this.registerForm.get('password').value,
      managerId:parseInt(this.registerForm.get('managerid').value),
      resourceName:this.registerForm.get('firstname').value+" "+this.registerForm.get('lastname').value,
      resourceSkills:this.registerForm.get('skills').value,
      designation:this.registerForm.get('role').value
    };
    //console.log(jsonForm);
    this.loginApi.registerUser(jsonForm).subscribe((data)=>{
      this.error="Registered Successfully";
      this.router.navigate(['']);
    },(error)=> {
      this.error=error;
      this.clicked = false;
    })
  }

  checkUsernameAvailability(){
    var username=this.registerForm.get('username').value
    //console.log(username);
    this.loginApi.checkUsername(username).subscribe((data)=>{
      this.checkUsername="check";
      this.usermsg=data.message;
      this.myalert="alert alert-success";
    },(error)=> {
      this.checkUsername="cancel";
      this.usermsg=error;
      this.myalert="alert alert-danger";
    })
  }
}
