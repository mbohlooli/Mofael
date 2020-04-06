import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  validInfo = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) this.router.navigate(["/"]);
  }

  submit(data) {
    //TODO: handle errors with a snack or modal or ...
    this.authService.login(data).subscribe(
      (token) => {
        localStorage.setItem("token", token.toString());
        console.log(this.authService.currentUser);
        console.log(token);
        let returnUrl = localStorage.getItem("returnUrl");

        localStorage.removeItem("returnUrl");
        this.router.navigateByUrl(returnUrl);
      },
      (err) => (this.validInfo = false)
    );
  }
}
