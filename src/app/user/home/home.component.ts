import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  myLinkElement: HTMLLinkElement;


  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    /*this.myLinkElement = document.createElement('link');
    this.myLinkElement.href = "assets/css/material-kit-pro.min3294.css?v=3.0.1";
    this.myLinkElement.rel = "stylesheet";
    this.myLinkElement.id = "pagestyle";
    document.head.appendChild(this.myLinkElement);*/
   /* if (this.authenticationService.tokenValid()) {
      this.authenticationService.logOut();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }*/
  }

  ngOnDestroy() {

   // document.head.removeChild(this.myLinkElement);
   // document.head.removeChild(this.myLinkElement);
  }

}
