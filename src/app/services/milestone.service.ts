import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  readonly rootURL = environment.rootURL;

  constructor(private httpClient: HttpClient) { }

  public getMilestonesByProjectId(id){
    var pid = parseInt(id);
    return this.httpClient.get(`${this.rootURL}/Milestone/byProjectId/${pid}`);
  }

  public getAllMilestones(){
    return this.httpClient.get(`${this.rootURL}/Milestone`);
  }

  public addNewMilestone(milestone) {
    return this.httpClient.post<any>(`${this.rootURL}/Milestone`, milestone);
  }

  public updateMilestone(id,milestone) {
    // console.warn(project);
    return this.httpClient.put<any>(`${this.rootURL}/Milestone/${id}`, milestone);
  }

  public addDefaultMilestones(milestone) {
    return this.httpClient.post<any>(`${this.rootURL}/Milestone`, milestone);
  }

}
