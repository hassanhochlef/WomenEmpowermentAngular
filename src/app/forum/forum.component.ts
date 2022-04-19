import { Component, OnInit } from '@angular/core';
import {Post} from '../models/post.model';
import {ForumService} from '../shared/forum.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {PostLike} from '../models/postLike.model';
import {PostComment} from '../models/postComment.model';
import {Advertising} from '../models/Advertising.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  menuItems: MenuItem[];
  listPost: Post[];
  listAdversting: Advertising[];

  listComments: Comment[];
  post: Post;
  postLike: PostLike = new PostLike();
  private routeSub: Subscription;
  comment: PostComment = new PostComment();

  constructor(private router: Router, private service: ForumService) {
  }

  ngOnInit(): void {
    this.routeSub = this.service.getPosts().subscribe(res => {
      console.log(res);
      this.listPost = res;
    });


    this.routeSub = this.service.getAdversting().subscribe(ress => {
      console.log(ress);
      this.listAdversting = ress;
    });
  }
  getPostComment(id: string): void{
   this.service.getComments(id).subscribe(ress => {
      console.log(ress);
      this.listComments = ress;
    });
  }
  addLikePost(id: string) {
    this.service.addPostLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);

    });
  }
  addDisLikePost(id: string) {
    this.service.addPostDisLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);

    });
  }
  addComment(id: string) {
    this.service.addCommentPst(id, this.comment).subscribe(p => {
      console.log(this.comment);

    });


  }
  deletePost(id: string) {
    this.service.DeletePost(id).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['user/forum']).then(() => {
      window.location.reload();
    });

  }
}
