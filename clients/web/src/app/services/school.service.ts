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

  constructor(private http: HttpClient) {}

  getSchools(): Observable<School[]> {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token")
    });
    return this.http
      .get(this.url, { headers })
      .pipe(map((res: School[]) => res));
  }

  create(data) {
    console.log(data);
  }

  getPersonelCount(id) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("token")
    });
    return this.http.get(this.url + "/count/" + id, { headers });
  }
}
