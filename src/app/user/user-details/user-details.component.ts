import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User = new User;
  currentUser: User = new User;
  friendList: Array<User> = [];
  currentUserFriendList: Array<User> = [];
  friendExists!: boolean;


  constructor(private authenticationService: AuthenticationService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });
    this.userService.getAllFriends().subscribe(data => {
      this.currentUserFriendList = data;
      console.log(data);
  });
  }

  handleUserDetails(){
    const theUserId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      this.userService.getAllFriends2(String(this.user.userId)).subscribe(data2 => {
        this.friendList = data2;
        this.friendExists = this.currentUserFriendList.some(e => e.userId === this.user.userId);
      });

    });

  }

  followUser(){
    const theUserId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      this.userService.followUser(this.user.username).subscribe();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

  unfollowUser(){
    const theUserId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      this.userService.unfollowUser(this.user.username).subscribe();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

}
