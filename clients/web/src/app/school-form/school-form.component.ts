import { Component, OnInit } from "@angular/core";

@Component({
  selector: "school-form",
  templateUrl: "./school-form.component.html",
  styleUrls: ["./school-form.component.css"]
})
export class SchoolFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  submit(data) {
    console.log(data);
  }
}
