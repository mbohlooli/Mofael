import { Observable } from "rxjs";
import { SchoolService } from "./../services/school.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { School } from "../models/school";

@Component({
  selector: "school-info",
  templateUrl: "./school-info.component.html",
  styleUrls: ["./school-info.component.css"],
})
export class SchoolInfoComponent implements OnInit {
  data$: Observable<{ school: School; count: number }>;

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolService
  ) {}

  ngOnInit() {
    this.data$ = this.schoolService.info(this.route.snapshot.params.id);
  }
}
