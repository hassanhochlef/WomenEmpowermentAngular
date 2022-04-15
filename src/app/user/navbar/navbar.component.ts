import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {Role} from '../../models/role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    })
  }

  ngOnInit(): void {
  }

  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut(){
    this.authenticationService.logOut();
    this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
  }

  redirectTo(){
    this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
}

}
