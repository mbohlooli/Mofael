import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { School } from "../models/school";
import { map } from "rxjs/operators";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class SchoolService {
  url = "http://localhost:3000/schools";
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  getSchools(): Observable<School[]> {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token"),
    });
    return this.http
      .get(this.url, { headers })
      .pipe(map((res: School[]) => res));
  }

  getSchool(id): Observable<School> {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token"),
    });
    return this.http
      .get(this.url + "/" + id, { headers })
      .pipe(map((res: School) => res));
  }

  create(school: School) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token"),
    });
    return this.http.post(this.url, school, { headers });
  }

  update(school: School) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token"),
    });
    return this.http.put(
      this.url + "/" + school._id,
      _.pick(school, ["name", "city", "zone"]),
      { headers }
    );
  }

  getPersonelCount(id) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token"),
    });
    return this.http.get(this.url + "/count/" + id, { headers });
  }

  delete(id) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token"),
    });
    return this.http.delete(this.url + "/" + id, { headers });
  }

  deleteAll() {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token"),
    });
    return this.http.delete(this.url, { headers });
  }
}
