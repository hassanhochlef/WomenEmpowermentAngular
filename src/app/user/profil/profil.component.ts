import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {UserService} from '../../shared/user.service';
import {Post} from '../../models/post.model';
import {Router} from '@angular/router';
import {stringify} from '@angular/compiler/src/util';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  currentUser: User = new User;
  allUsers: Array<User> = [];
  friendList: Array<User> = [];
  friendSuggestionList: Array<User> = [];
  friendInCommon: Array<User> = [];
  myPosts: Array<Post> = [];
  profilPicture!: string;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router ) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
    this.userService.getAllFriends().subscribe(data => {
      this.friendList = data;

      this.userService.getSuggestedFriends2().subscribe(data => {
        this.friendSuggestionList = data;
      });
    });

    this.userService.getMyPosts().subscribe(data2 => {
      this.myPosts = data2;
    });

    this.userService.getUserProfilPicture().subscribe(xx => {
      this.profilPicture = xx.split('\\').pop();
    }, err => {
      this.profilPicture = "https://res.cloudinary.com/diubo1tzp/image/upload/v1650587140/defaultProfilePicture_drigsj.png";
    });

    this.userService.getAllUser().subscribe(users => {
      this.allUsers = users;
    });

  }

  getFriendsInCommon(userId: string){
    return this.userService.getUsersInCommon(userId).subscribe( data => {
      this.friendInCommon = data;
    });
  }

  navigateTo(userId: string){
    const url = `user/profil/${userId}`;
    console.log(url);
    this.router.navigate([url])
        .then(() => {
          window.location.reload();
        });
  }

}
