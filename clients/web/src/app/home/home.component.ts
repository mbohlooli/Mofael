import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("lineChart", { static: false }) private chartRef: ElementRef;
  chart: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
          label: "Earnings",
          borderWidth: 1,
          borderColor: "#4e73df",
          backgroundColor: 'rgb(114, 143, 224, 0.2)',
          data: [200, 10000, 5000, 3000, 11000],
        }],
      },
      options: {
        maintainAspectRatio: false,
      }
    });
  }

}
