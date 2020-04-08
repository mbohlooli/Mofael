import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  @Input("page") page: number;
  @Input("pagesCount") pagesCount: number;
  @Input("pageNumbers") pageNumbers: number[];
  @Input("forwardDisabled") forwardDisabled: boolean;
  @Input("backwardDisabled") backwardDisabled: boolean;

  @Output("pageSelect") pageSelect = new EventEmitter();
  @Output("forward") forward = new EventEmitter();
  @Output("backward") backward = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
