import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }


  taskArray:any

  login(body:any) {
    return this.http.post('http://10.0.0.43:8888/api/login',body)
  }

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }),
    };
    return this.http.get('http://10.0.0.43:8888/api/getAssignments',httpOptions)
  }

  addTask(body:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }),
    };
    return this.http.post('http://10.0.0.43:8888/api/addTask',body,httpOptions)
  }

add(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }),
  };
  return this.http.get('http://10.0.0.43:8888/api/getAssignments',httpOptions)

}

addItems(body:any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }),
  };
  return this.http.post('http://10.0.0.43:8888/api/addLineItem',body,httpOptions)
}

editTask(body:any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }),
  };
  return this.http.post('http://10.0.0.43:8888/api/editTask',body,httpOptions)
}

editLine(body:any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }),
  };
  return this.http.post('http://10.0.0.43:8888/api/editLineItem',body,httpOptions)
}
}

