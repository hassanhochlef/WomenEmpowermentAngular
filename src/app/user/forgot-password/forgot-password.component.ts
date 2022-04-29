import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService ,private router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    this.authenticationService.forgotPassword(this.email).subscribe( data => {
    }, err => {
      this.errorMessage = 'Could not find any account binded to this email. Please verify the entred information ...';
        }
    );
  }

}
