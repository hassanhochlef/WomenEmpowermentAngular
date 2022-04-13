import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  myLinkElement: HTMLLinkElement;

  constructor() {
    this.myLinkElement = document.createElement('link');
    this.myLinkElement.href = "assets/css/material-kit.css?v=3.0.2";
    this.myLinkElement.rel = "stylesheet";
    document.body.appendChild(this.myLinkElement);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    document.body.removeChild(this.myLinkElement);
  }

}
