import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

  readonly rootURL = 'https://localhost:5001/api';

  constructor(private httpClient: HttpClient) { }

  public getTaskByProjectId(id){
    return this.httpClient.get(`${this.rootURL}/projecttask/${id}`);
  }

  public getTaskById(id){
    return this.httpClient.get(`${this.rootURL}/projecttask/taskid/${id}`);
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
}
