import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';
import {Role} from '../../models/role.enum';
import {AppComponent} from '../../app.component';
import {Country} from '../../models/country.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  myLinkElement: HTMLLinkElement;

  user: User = new User();
  errorMessage: string = "";
  middleRole: string = "";
  roles: Role[] = [];
  userParsed: string = "";
  selectedFile!: File;

  countries = Country;
  countryKeys = [];

  constructor(public app: AppComponent, private authenticationService: AuthenticationService, private router: Router) {
   /* this.myLinkElement = document.createElement('link');
    this.myLinkElement.href = "assets/css/material-kit-pro.min3294.css?v=3.0.1";
    this.myLinkElement.rel = "stylesheet";
    this.myLinkElement.id = "pagestyle";
    document.body.appendChild(this.myLinkElement);*/
  }

  ngOnInit(): void {
    this.roles = [ Role.USER, Role.ADMIN, Role.EXPERT, Role.COMPANY, Role.FORMER ];
    this.middleRole = Role.USER;
    this.countryKeys = Object.keys(this.countries);
    this.user.country = this.countryKeys[226];
  }

  ngOnDestroy() {
    //document.body.removeChild(this.myLinkElement);
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
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          }); },
        err => {
          if (err?.status === 409){
            this.errorMessage = 'Username already exists';
          }
          else if (err?.status === 400){
            this.errorMessage = 'Email already exists';
          }
          else if (err?.status === 406){
            this.errorMessage = 'Password must:\n\tHave 8 or more characters' +
                '\n\tContain 1 or more uppercase characters' +
                '\n\tContain 1 or more digit characters\n\tContain 1 or more special characters';
          }
          else{
            this.errorMessage = 'Unexpected error occurred : ' + err?.errorMessage;
            console.log(err);
          }
        }
    );
  }
  onFileSelcted(event: any){
    console.log(event.target.result);
    this.selectedFile = event.target.files[0];
  }




  redirectTo(){
    this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
  }




}
