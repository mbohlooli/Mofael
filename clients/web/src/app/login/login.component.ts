import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) this.router.navigate(["/"]);
  }

  submit(data) {
    //TODO: handle errors with a snack or modal or ...
    this.authService.login(data).subscribe(token => {
      localStorage.setItem("token", token.toString());
      let returnUrl = localStorage.getItem("returnUrl");

      localStorage.removeItem("returnUrl");
      this.router.navigateByUrl(returnUrl);
    });
  }

}
