import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "info-card",
  templateUrl: "./info-card.component.html",
  styleUrls: ["./info-card.component.css"],
})
export class InfoCardComponent implements OnInit {
  @Input("color") color: string;
  @Input("title") title: string;
  @Input("icon") icon: string;
  @Input("progress") progress: boolean = false;
  @Input("progressValue") progressValue: number;

  constructor() {}

  ngOnInit() {}
}
