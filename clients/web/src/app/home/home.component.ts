import { SchoolService } from "../services/school.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { School } from "../models/school";
import { Router } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  schools$: Observable<School[]>;
  router: Router;

  columns = [
    { path: "name", label: "نام" },
    { path: "city", label: "شهر" },
    { path: "zone", label: "منطقه" }
  ];

  constructor(private schoolService: SchoolService, router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.schools$ = this.schoolService.getSchools();
  }
}
