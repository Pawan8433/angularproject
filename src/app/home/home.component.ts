// home.component.ts
import { Component, AfterViewInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const options = {
      strings: ['Pawan Singh'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 2000,
      loop: true
    };
    new Typed('.typed', options);
  }
}
