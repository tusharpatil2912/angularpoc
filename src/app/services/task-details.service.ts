import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

  //readonly rootURL = 'https://localhost:5001/api';
  //readonly rootURL = 'https://projecttrackerdotnetapi.herokuapp.com/api';
  readonly rootURL = environment.rootURL;

  constructor(private httpClient: HttpClient) { }

  public getTaskByProjectId(id){
    return this.httpClient.get(`${this.rootURL}/projecttask/${id}`);
  }

  public getTaskById(id){
    return this.httpClient.get(`${this.rootURL}/projecttask/taskid/${id}`);
  }

  public getTaskByResourceId(id){
    return this.httpClient.get(`${this.rootURL}/projecttask/resourceid/${id}`);
  }

  public getTasksList(){
    return this.httpClient.get(`${this.rootURL}/projecttask`);
  }

  public addNewTask(task) {
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json; charset=utf-8');
    // let formdata = JSON.stringify(project);
    // console.warn(project);
    return this.httpClient.post<any>(`${this.rootURL}/projecttask`, task);
  }
  public updateTask(id,task) {
    // console.warn(project);
    return this.httpClient.put<any>(`${this.rootURL}/projecttask/${id}`, task);
  }
  public downloadTaskFile(id){
    return this.httpClient.get(`${this.rootURL}/projecttask/filedownload/${id}`,{responseType:"blob"});
  }
  public GetPeerReviewTasksById(id){
    return this.httpClient.get(`${this.rootURL}/projecttask/GetPeerReviewTasksById/${id}`);
  }
  public updateTaskStatus(id,status) {
    // console.warn(project);
    return this.httpClient.put<any>(`${this.rootURL}/projecttask/updateTaskStatus/${id}?status=${status}`, status);
  }
}
