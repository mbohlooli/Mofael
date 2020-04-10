import { AuthService } from "./auth.service";
import { CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.currentUser.hasPermission(2)) return true;
    this.router.navigate(["/403"]);
  }
}
