import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {ChatService} from "../../shared/chat.service";
import {AuthenticationService} from "../../shared/authentication.service";
import {Message} from "../../models/message";
import {PostComment} from "../../models/postComment.model";

@Component({
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss']
})
export class ChatPriveComponent implements OnInit {

  // Holding the chat messages
  messages: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  m = '2';
  a = '1';
  @Input('username')
  set setsender(value: string) {
    this.m = value;
  }
  @Input('username')
  set setreciver(value: string) {
    this.a = value;
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
      username: this.username,
      sender: '2',
      reciver: '3'
    };

    this.chatService.sendMessage(obj);
  }
  openChat(cc: string , dd: string): void {
    this.a = cc;
    this.m = dd;
  }
}
