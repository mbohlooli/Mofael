import { Router } from "@angular/router";
import { SchoolService } from "./../services/school.service";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { School } from "../models/school";

@Component({
  selector: "school-form",
  templateUrl: "./school-form.component.html",
  styleUrls: ["./school-form.component.css"],
})
export class SchoolFormComponent implements OnInit {
  school: School;

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService,
    private router: Router
  ) {}

  ngOnInit() {
    this.school = { name: "", city: "", zone: "" };
  }

  submit() {
    if (parseInt(this.school.zone) < 1) return;

    this.schoolService
      .create(this.school)
      .subscribe(() => this.router.navigate(["/"]));
  }
}
