import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  myLinkElement: HTMLLinkElement;


  constructor() {

  }

  ngOnInit(): void {
    /*this.myLinkElement = document.createElement('link');
    this.myLinkElement.href = "assets/css/material-kit-pro.min3294.css?v=3.0.1";
    this.myLinkElement.rel = "stylesheet";
    this.myLinkElement.id = "pagestyle";
    document.head.appendChild(this.myLinkElement);*/

  }

  ngOnDestroy() {
   // document.head.removeChild(this.myLinkElement);

  }

}
