import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  constructor(private httpClient: HttpClient) { }

  public getProjectDetails(id){
    return this.httpClient.get(`http://localhost/newwebapi/api/project/${id}`);
  }

  public getProjecttList(){
    return this.httpClient.get(`http://localhost/newwebapi/api/project`);
  }

  public addNewProject(project) {
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json; charset=utf-8');
    // let formdata = JSON.stringify(project);
     console.warn(project);
    return this.httpClient.post<any>(`http://localhost/newwebapi/api/project`, project);
  }
}
