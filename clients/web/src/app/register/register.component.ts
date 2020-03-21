import { AuthService } from './../auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) this.router.navigate(['/']);
  }

  submit(data) {
    if (data.repeatPassword != data.password) {
      //TODO: add validation and display a message
      console.log("error");
      return;
    }

    this.userService.register(_.pick(data, ["username", "password", "firstName", "lastName"])).subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

}
