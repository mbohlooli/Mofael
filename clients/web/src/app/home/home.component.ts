import { SchoolService } from "../services/school.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { School } from "../models/school";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  schools$: Observable<School[]>;
  router: Router;
  deleteWithoutWarning = false;

  columns = [
    { path: "name", label: "نام" },
    { path: "city", label: "شهر" },
    { path: "zone", label: "منطقه" },
  ];

  constructor(
    private schoolService: SchoolService,
    router: Router,
    public authService: AuthService
  ) {
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

  deleteAllSchools() {
    this.schoolService
      .deleteAll()
      .subscribe(() => (this.schools$ = this.schoolService.index()));
  }
}
