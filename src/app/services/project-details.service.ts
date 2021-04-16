import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  //readonly rootURL = 'http://localhost/latestapi/api';
  //readonly rootURL = 'https://localhost:5001/api';
  readonly rootURL = 'https://projecttrackerdotnetapi.herokuapp.com/api';

  constructor(private httpClient: HttpClient) { }

  public getProjectDetails(id){
    return this.httpClient.get(`${this.rootURL}/project/${id}`);
  }

  public getProjecttList(){
    return this.httpClient.get(`${this.rootURL}/project`);
  }

  public addNewProject(project) {
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json; charset=utf-8');
    // let formdata = JSON.stringify(project);
    // console.warn(project);
    return this.httpClient.post<any>(`${this.rootURL}/project`, project);
  }
  public updateProject(id,project) {
    // console.warn(project);
    return this.httpClient.put<any>(`${this.rootURL}/project/${id}`, project);
  }
}
