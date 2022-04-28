import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  currentUser: User = new User;
  friendList: Array<User> = [];
  friendSuggestionList: Array<User> = [];
  friendInCommon: Array<User> = [];

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
    this.userService.getAllFriends().subscribe(data =>{
      this.friendList = data;

      this.userService.getSuggestedFriends2().subscribe(data => {
        this.friendSuggestionList = data;
      });
    });

  }

  getFriendsInCommon(userId: string){
    return this.userService.getUsersInCommon(userId).subscribe( data => {
      this.friendInCommon = data;
      console.log(data);
    });
  }

}
