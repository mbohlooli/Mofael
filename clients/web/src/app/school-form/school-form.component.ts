import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { School } from "../models/school";
import { SchoolService } from "./../services/school.service";

@Component({
  selector: "school-form",
  templateUrl: "./school-form.component.html",
  styleUrls: ["./school-form.component.css"],
})
export class SchoolFormComponent implements OnInit {
  school: School;
  schoolExisted = false;

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id)
      this.schoolService
        .getSchool(this.route.snapshot.params.id)
        .subscribe((school) => {
          this.school = school;
        });
    else this.school = { name: "", city: "", zone: "" };
  }

  submit() {
    if (this.route.snapshot.params.id) this.update();
    else this.create();
  }

  create() {
    if (parseInt(this.school.zone) < 1) return;

    this.schoolService.create(this.school).subscribe(
      () => this.router.navigate(["/"]),
      (err) => (this.schoolExisted = true)
    );
  }

  update() {
    if (parseInt(this.school.zone) < 1) return;

    this.schoolService.update(this.school).subscribe(
      () => this.router.navigate(["/"]),
      (err) => (this.schoolExisted = true)
    );
  }
}
