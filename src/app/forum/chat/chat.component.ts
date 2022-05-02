import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ChatService} from '../../shared/chat.service';
import {Message} from "../../models/message";
import {AuthenticationService} from "../../shared/authentication.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  // Holding the chat messages
  messages: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();

  @Input('username')
  set setUsername(value: string) {
    this.username = value;
  }


  constructor(public chatService: ChatService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    });
  }
  ngOnInit(): void {
    this.username = this.currentUser.username;
  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage(event: any, avatar: string) {
    let obj: Message = {
      text: this.messages,
      avatar: avatar,
      username: this.username
    };

    this.chatService.sendMessage(obj);
  }
}
