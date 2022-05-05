import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  public currentUser: Observable<User>;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

  }

}
