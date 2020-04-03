import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { School } from "../models/school";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SchoolService {
  url = "http://localhost:3000/schools";
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token")
    });
  }

  getSchools(): Observable<School[]> {
    return this.http
      .get(this.url, { headers: this.headers })
      .pipe(map((res: School[]) => res));
  }

  create(school: School) {
    return this.http.post(this.url, school, { headers: this.headers });
  }

  getPersonelCount(id) {
    return this.http.get(this.url + "/count/" + id, { headers: this.headers });
  }
}
