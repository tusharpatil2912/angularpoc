import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  //readonly rootURL = 'https://localhost:5001/api';
  //readonly rootURL = 'https://projecttrackerdotnetapi.herokuapp.com/api';
  readonly rootURL = environment.rootURL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  public loginUser(user){
    return this.httpClient.post<any>(`${this.rootURL}/resource/login`,user)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
  }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  public getUserstList(){
    return this.httpClient.get(`${this.rootURL}/resource`);
  }

  public registerUser(user) {
    return this.httpClient.post<any>(`${this.rootURL}/resource`, user);
  }
  public checkUsername(username) {
    return this.httpClient.post<any>(`${this.rootURL}/resource/checkusername?username=${username}`, username);
  }
  public getByDesignation(designation) {
    return this.httpClient.post<any>(`${this.rootURL}/resource/designation?desg=${designation}`,designation);
  }
  public updateUser(id,user) {
    // console.warn(project);
    return this.httpClient.put<any>(`${this.rootURL}/resource/${id}`, user);
  }
}

class User {
  token?: string;
  userDetails: UserDetails;
}
class UserDetails{
  resourceId: number;
  managerId: number;
  resourceName: string;
  noOfProjects: number;
  tasksAssigned: string;
  resourceSkills: string;
  userName: string;
  resourceCreatedDate: string;
}