import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  //readonly rootURL = 'http://localhost/latestapi/api';
  //readonly rootURL = 'https://localhost:5001/api';
  //readonly rootURL = 'https://projecttrackerdotnetapi.herokuapp.com/api';
  readonly rootURL = environment.rootURL;

  constructor(private httpClient: HttpClient) { }

  public getProjectDetails(id){
    return this.httpClient.get(`${this.rootURL}/project/${id}`);
  }

  public getProjecttList(){
    return this.httpClient.get(`${this.rootURL}/project`);
  }

  public getallocatedResourceList(projId){
    return this.httpClient.get(`${this.rootURL}/Resource/byProjectId/${projId}`);
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

  public getAllReleases(){
    return this.httpClient.get(`${this.rootURL}/Release`);
  }
  public getReleaseById(id){
    return this.httpClient.get(`${this.rootURL}/Release/${id}`);
  }
  public getProjectsByReleaseId(id){
    return this.httpClient.get(`${this.rootURL}/Project/byreleaseid/${id}`);
  }
  public addNewRelease(release) {
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json; charset=utf-8');
    // let formdata = JSON.stringify(project);
    // console.warn(project);
    return this.httpClient.post<any>(`${this.rootURL}/Release`, release);
  }

  public updateRelease(id,release) {
    // console.warn(project);
    return this.httpClient.put<any>(`${this.rootURL}/Release/${id}`, release);
  }

  // public uploadReleaseFile(formadata, id, filetype){
  //   return this.httpClient.post<any>(`${this.rootURL}/Release/fileupload/${filetype}/${id}`, formadata, {reportProgress: true, observe: 'events',responseType: 'text'});
  // }

  public downloadReleaseFile(filetype,id){
    return this.httpClient.get(`${this.rootURL}/Release/filedownload/${filetype}/${id}`,{responseType:"blob"});
  }

  public downloadProjectFile(filetype,id){
    return this.httpClient.get(`${this.rootURL}/Project/filedownload/${filetype}/${id}`,{responseType:"blob"});
  }

}
