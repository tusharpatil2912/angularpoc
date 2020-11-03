import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  constructor(private httpClient: HttpClient) { }

  public getProjectDetails(id){
    return this.httpClient.get(`http://localhost/webapi/api/project/${id}`);
  }

  public getProjecttList(){
    return this.httpClient.get(`http://localhost/webapi/api/project`);
  }
}
