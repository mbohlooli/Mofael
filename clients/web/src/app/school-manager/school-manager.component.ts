import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { School } from "../models/school";
import { SchoolService } from "../services/school.service";

@Component({
  selector: "school-manager",
  templateUrl: "./school-manager.component.html",
  styleUrls: ["./school-manager.component.css"],
})
export class SchoolManagerComponent implements OnInit {
  schools$: Observable<School[]>;
  router: Router;
  deleteWithoutWarning = false;

  columns = [
    { path: "name", label: "نام" },
    { path: "city", label: "شهر" },
    { path: "zone", label: "منطقه" },
  ];

  constructor(private schoolService: SchoolService, router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.schools$ = this.schoolService.index();
  }

  delete(id) {
    this.schoolService
      .delete(id)
      .subscribe(() => (this.schools$ = this.schoolService.index()));
  }

  deleteAll(schools) {
    this.schoolService
      .deleteAll()
      .subscribe(() => (this.schools$ = this.schoolService.index()));
  }
}
