import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  url = "http://localhost:3000/schools"

  constructor(private http: HttpClient) { }

  getSchools() {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token")
    });
    return this.http.get(this.url, { headers });
  }

  getPersonelCount(id) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token")
    });
    return this.http.get(this.url + '/count/' + id, { headers });
  }
}
