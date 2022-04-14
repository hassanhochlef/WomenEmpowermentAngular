import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';
import {Role} from '../../models/role.enum';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage: string = "";
  middleRole: string = "";
  roles: Role[] = [];
  step: number = 1;
  userParsed: string = "";
  selectedFile!: File;

  constructor(public app: AppComponent, private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    this.roles = [ Role.USER, Role.ADMIN, Role.EXPERT, Role.COMPANY, Role.FORMER ];
  }

  register(){
    if (this.middleRole == 'USER')
      this.user.role = Role.USER;
    else if (this.middleRole == 'COMPANY')
      this.user.role = Role.COMPANY;
    else if (this.middleRole == 'EXPERT'){
      this.user.role = Role.EXPERT;
      this.user.nbCasesSolved = 0;
    }
    else if (this.middleRole == 'ASSOCIATION') {
      this.user.role = Role.ASSOCIATION;
      this.user.nbEventsCreated = 0;
    }
    else if (this.middleRole == 'FORMER')
      this.user.role = Role.FORMER;

    this.userParsed = JSON.stringify(this.user);
    console.log(this.userParsed);

    this.authenticationService.register(this.userParsed, this.selectedFile).subscribe(data => {
          this.router.navigate(['/login']);},
        err => {
          if (err?.status === 409){
            this.errorMessage = 'Username already exists';
          }
          else{
            this.errorMessage = 'Unexpected error occurred : ' + err?.errorMessage;
            console.log(err);
          }
        }
    );
  }
  onFileSelcted(event: any){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  next(){
    this.step = this.step + 1 ;
  }

  previous(){
    this.step = this.step - 1 ;
  }




}
