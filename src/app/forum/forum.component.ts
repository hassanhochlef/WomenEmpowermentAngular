import { Component, OnInit } from '@angular/core';
import {Post} from '../models/post.model';
import {ForumService} from '../shared/forum.service';
import {Subscription} from 'rxjs';import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  menuItems: MenuItem[];
  listPost: Post[];
  listComments: Comment[];
  private routeSub: Subscription;
  private id: number;

  constructor(private router: Router, private service: ForumService) {
  }

  ngOnInit(): void {
    this.routeSub = this.service.getPosts().subscribe(res => {
      console.log(res);
      this.listPost = res;
    });
  }

}
