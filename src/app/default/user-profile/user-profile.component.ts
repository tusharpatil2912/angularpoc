import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { UserAuthService } from "../../services/user-auth.service";
import { environment } from "../../../environments/environment";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  userData;
  name;
  managers;
  imageSrc = "assets/img/img_avatar3.png";
  base64string;
  savechangesmsg;

  constructor(private fb: FormBuilder, private http: HttpClient,private notifier: NotifierService,
    private userApi: UserAuthService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.name = this.userData.user['resourceName'];
    this.base64string = this.userData.user['profilePictureFilebase64'];
    this.userForm = this.fb.group({
      resourceId: [''],
      managerId: [''],
      resourceName: [''],
      resourceSkills: [''],
      designation: [''],
      userName: [''],
      resourceCreatedDate: [''],
      profilePicture: [''],
      profilePictureFile: [''],
      profilePictureFilebase64: ['']
    });
    if (this.userData.user['profilePictureFilebase64'] != "" && this.userData.user['profilePictureFilebase64'] != null) {
      this.imageSrc = "data:" + this.userData.user['profilePicture'] + ";base64," + this.base64string;
    }

    this.userApi.getByDesignation("teamlead").subscribe((data) => {
      this.managers = data;
      //console.log(this.managers);
    }, (error) => {
      this.managers = {
        resourseId: 0,
        resourseName: "No Managers Registerd"
      };
    })

    this.userForm.patchValue({
      resourceId: this.userData.user['resourceId'],
      managerId: this.userData.user['managerId'],
      resourceName: this.userData.user['resourceName'],
      resourceSkills: this.userData.user['resourceSkills'],
      designation: this.userData.user['designation'],
      userName: this.userData.user['userName'],
      resourceCreatedDate: this.userData.user['resourceCreatedDate'],
      profilePicture: this.userData.user['profilePicture'],
      profilePictureFile: this.userData.user['profilePictureFile'],
      profilePictureFilebase64: this.userData.user['profilePictureFilebase64']
    })
  }

  updateProfile() {
    var json = {
      resourceId: this.userData.user['resourceId'],
      managerId: parseInt(this.userForm.get('managerId').value),
      resourceName: this.userForm.get('resourceName').value,
      resourceSkills: this.userForm.get('resourceSkills').value,
      designation: this.userForm.get('designation').value,
      userName: this.userData.user['userName']
    }
    //console.log(json);
    this.userApi.updateUser(this.userData.user['resourceId'],json).subscribe((data)=>{
      this.notifier.notify("success", "Profile Updated Successfully");

      var updatedUser = {
        token: this.userData.token,
        user: data
      }
      //console.log(updatedUser);
      this.userApi.updatelocalstorageuser(updatedUser);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    },(error)=>{
      this.notifier.notify("error", "Internal Server error occured");
    })
  }


  readonly rootURL = environment.rootURL;
  public progress: number;
  public message: string;
  fileNameToBeSaved;
  @Output() public onUploadFinished = new EventEmitter();

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    this.http.post(`${this.rootURL}/Resource/uploadProfilePicture/${this.userData.user['resourceId']}`, formData, { reportProgress: true, observe: 'events', responseType: 'text' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
            let me = this;
            let file = files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              me.base64string = reader.result.toString().split(',')[1];
              me.imageSrc = "data:" + me.userData.user['profilePicture'] + ";base64," +  me.base64string;
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
         
          setTimeout(() => {
            //this.refreshAllData();
            this.message = null;
            this.progress = null;
            this.savechangesmsg = "Click Save Changes Button or Relogin to See Updates";
          }, 1000);
        }
      });
  }

}
