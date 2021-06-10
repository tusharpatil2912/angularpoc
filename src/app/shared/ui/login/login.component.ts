import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from "../../../services/user-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error =null;
  clicked = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginApi: UserAuthService, 
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  
  this.loginForm = this.fb.group({
    username: [''],
    password: ['']
  });
}
  submitForm(){
    //console.warn(this.loginForm.value);
    this.clicked = true;
    const jsonForm ={
      username:this.loginForm.get('username').value,
      password:this.loginForm.get('password').value
    };
    this.loginApi.loginUser(jsonForm).subscribe((data)=>{
      this.router.navigate(['']);
    },(error)=> {
      this.error=error;
      this.clicked = false;
    })
  }


}
