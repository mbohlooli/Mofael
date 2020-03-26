import { SchoolService } from '../services/school.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  schools$: Observable<School[]>;

  columns = [
    { path: "name", label: "نام" },
    { path: "city", label: "شهر" },
    { path: "zone", label: "منطقه" },
  ];

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.schools$ = this.schoolService.getSchools();
  }

}
