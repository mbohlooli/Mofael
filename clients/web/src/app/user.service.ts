import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3000/users"

  constructor(private http: HttpClient, private router: Router) { }

  register(data) {
    return this.http.post(this.url + '/register', data);
  }
}
