import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = "http://localhost:3000/auth/login";
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  login(credentials) {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    return this.http.post(this.url, credentials);
  }

  isLoggedIn() {
    const jwt = new JwtHelperService();
    return !jwt.isTokenExpired(localStorage.getItem("token"));
  }

  get currentUser(): User {
    const jwt = new JwtHelperService();
    let token = localStorage.getItem("token");
    if (!token) return null;

    return new User(jwt.decodeToken(token));
  }
}
