import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginn',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string = "";

  constructor(public app: AppComponent, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.userId){
      this.router.navigate(['']);
      return;
    }
  }

  login(){
    this.authenticationService.login(this.user).subscribe( data => {
      this.router.navigate(['']);
    }, err => {
      this.errorMessage = 'Username or password is incorrect';
      console.log(err);
    });
  }

}
