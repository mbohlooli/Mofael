import { Router } from "@angular/router";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
})
export class DataTableComponent implements OnInit {
  @Input("columns") columns;
  @Input("data") data: any[];
  @Input("defaultPath") defaultPath;
  @Input("infoUrl") infoUrl;
  @Input("updateUrl") updateUrl;
  @Input("actions") actions = {
    update: true,
    delete: true,
    info: true,
  };
  @Input("deleteWithoutWarning") deleteWithoutWarning;

  @Output("onDeleteItem") deleteItemEvent = new EventEmitter();
  @Output("onDeleteAll") deleteAllEvent = new EventEmitter();

  sortColumn = { path: "", order: "" };
  limit: number;
  pagesCount: number;
  page = 1;
  filteredData: any[];
  pagedData: any[];
  deleteIndex;
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.filteredData = this.data;
    this.limit = Math.min(this.data.length, 5);
    this.sort(this.defaultPath || this.columns[0].path);
  }

  sort(path) {
    if (this.sortColumn.path == path)
      this.sortColumn.order = this.sortColumn.order == "asc" ? "desc" : "asc";
    else this.sortColumn = { path, order: "asc" };
    this.filteredData = _.orderBy(
      this.data,
      [this.sortColumn.path],
      [this.sortColumn.order]
    );
    this.syncPages();
  }

  pick(item, path) {
    return _.get(item, path);
  }

  shiftPage(shift) {
    this.page += shift;
    this.paginateData();
  }

  syncPages(pageNumber = 1) {
    if (this.limit <= 0) this.limit = 1;
    if (this.limit >= this.filteredData.length)
      this.limit = this.filteredData.length;
    this.page = pageNumber;
    this.pagesCount = Math.ceil(this.data.length / this.limit);
    this.paginateData();
  }

  paginateData() {
    this.pagedData = this.filteredData.slice(
      (this.page - 1) * this.limit,
      this.page * this.limit
    );
  }

  search(query: string) {
    this.filteredData = query
      ? this.filteredData.filter((item) => {
          for (let column of this.columns)
            if (
              typeof item[`${column.path}`] == "string" &&
              item[`${column.path}`].toLowerCase().includes(query.toLowerCase())
            )
              return item;
        })
      : this.data;
    if (query == "") this.limit = Math.min(this.data.length, 5);
    this.syncPages();
  }

  min(a, b) {
    return Math.min(a, b);
  }

  getType(variable) {
    return typeof variable;
  }

  getPageNumbersArray() {
    let pages = [];
    for (let i = 1; i <= this.pagesCount; i++) pages.push(i);

    return pages;
  }

  delete() {
    this.deleteItemEvent.emit(this.pagedData[this.deleteIndex]._id);
    this.deleteIndex = -1;
  }

  deleteByIndex(index) {
    this.deleteItemEvent.emit(this.pagedData[index]._id);
    this.deleteIndex = -1;
  }

  deleteAll() {
    this.deleteAllEvent.emit(this.data);
    this.deleteIndex = -1;
  }

  log(x) {
    console.log(x);
  }
}
