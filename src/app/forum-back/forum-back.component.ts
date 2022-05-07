import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Post} from "../models/post.model";
import {Advertising} from "../models/Advertising.model";
import {PostLike} from "../models/postLike.model";
import {Subscription} from "rxjs";
import {PostComment} from "../models/postComment.model";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {ForumService} from "../shared/forum.service";
import {AuthenticationService} from "../shared/authentication.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-forum-back',
  templateUrl: './forum-back.component.html',
  styleUrls: ['./forum-back.component.scss']
})
export class ForumBackComponent implements OnInit {
  menuItems: MenuItem[];
  listPost: Post[];
  adv: Advertising = new Advertising();
  listAdversting: Advertising[];
  xl: number;
  listComments: Comment[];
  post: Post;
  postLike: PostLike = new PostLike();
  private routeSub: Subscription;
  comment: PostComment = new PostComment();
  comment1: PostComment = new PostComment();
  comment2: PostComment = new PostComment();
  post1: Post = new Post();
  image!: File;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  currentUser: User = new User();
  aa: string;
  comm2: PostComment = new PostComment();
  post2: Post = new Post();
  errorMessage: string = "";
  errorComment: string = "";
  commenttest: string = "";
  term: string;
  submitted: boolean;
  eventDialog: boolean;
  eventDialoga: boolean;

  post11: Post = new Post();


  constructor(private router: Router, private service: ForumService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }
  openNew() {
    this.post = null;
    this.submitted = false;
    this.eventDialog = true;
  }
  openNew2() {
    this.post = null;
    this.submitted = false;
    this.eventDialoga = true;
  }
  ngOnInit(): void {
    this.routeSub = this.service.getPosts().subscribe(res => {
      console.log(res);
      this.listPost = res;
    });
    this.comm2.user = this.currentUser;

    this.routeSub = this.service.getAdversting().subscribe(ress => {
      console.log(ress);
      this.listAdversting = ress;
    });
  }

  getPostComment(id: string): void {
    this.service.getComments(id).subscribe(ress => {
      console.log(ress);
      this.listComments = ress;
    });
  }

  addLikePost(id: string) {
    this.service.addPostLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

  addDisLikePost(id: string) {
    this.service.addPostDisLike(id, this.postLike).subscribe(p => {
      console.log(this.postLike);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

  addComment(id: string) {
    this.service.addCommentPst(id, this.comment).subscribe(data => {
          this.router.navigate(['/user/forum']).then(() => {
            window.location.reload();
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorComment = 'Bad Word used';
          } else if (err?.status === 400) {
            this.errorComment = 'Email already exists';
          }
        }
    );
  }

  /*    .subscribe(p => {
      console.log(this.comment);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }*/
  addCommentReply(id: string) {
    this.service.addCommentReply(id, this.comment1).subscribe(p => {
      console.log(this.comment1);
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    });
  }

  onFileSelcted(event: any) {
    console.log(event);
    this.image = event.target.files[0];
  }

  addimagePost(id: string) {
    this.service.addImagePost(id, this.image).subscribe(p => {
      console.log(this.image);
    });
  }

  Like_Dislike(id: string) {
    this.service.Like_Dislike(id).subscribe(p => {
      console.log(this.comment);
      this.xl = p;
    });


  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  deletePost(id: string) {
    this.service.DeletePost(id).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['admin/forumb']).then(() => {
      window.location.reload();
    });

  }

  deleteCom(id: string) {
    this.service.DeleteCom(id).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['user/forum']).then(() => {
      window.location.reload();
    });

  }

  openPostDetails(id: string): void {
    this.router.navigate(['user/post-detais', id]);
  }

  openCom(cc: PostComment): void {
    this.comm2 = cc;
  }

  openPost(cc: Post): void {
    this.post2 = cc;
  }

  openPostdel(cc: Post): void {
    this.post2 = cc;
  }

  UpdateComm(id: string) {
    this.service.UpdateCom(id, this.comment2).subscribe(p => {
      console.log(this.comment2);
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    });
  }

  UpdatePost(id: string) {
    if (this.post1.body === '') {
      this.post1.body = this.post2.body;
    }
    this.service.UpdatePost(id, this.post1).subscribe(data => {
          this.router.navigate(['/user/forum']).then(() => {
            window.location.reload();
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Bad Word used';
          } else if (err?.status === 400) {
            this.errorMessage = 'Email already exists';
          }
        }
    );
  }

  ratePost(id: string, x: string) {
    this.service.ratePost(id, x).subscribe(p => {
      console.log(this.post1);
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    });
  }

  reportPost(id: string) {
    this.service.reportPost(id).subscribe(p => {
      console.log("reporte");
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    });
  }

  message = '';

  imageu(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.service.image(this.currentFile, '4').subscribe(
            (event: any) => {
              console.log("*******");
              console.log(event);
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;

                console.log(event);
                alert(event.body.reponse);
              }
            },
            (err: any) => {
              console.log(err);
              this.progress = 0;
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
              this.currentFile = undefined;
            });
      }
      this.selectedFiles = undefined;

    }
  }
  addnewpost() {
    this.service.addPost(this.post11).subscribe(data => {
          this.router.navigate(['/admin/forumb']).then(() => {
            window.location.reload();
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Bad Word used';
          } else if (err?.status === 400) {
            this.errorMessage = 'Email already exists';
          }
        }
    );
  }
  addnewadv() {
    this.service.addadv(this.adv).subscribe(data => {
          this.router.navigate(['/admin/forumb']).then(() => {
            window.location.reload();
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Bad Word used';
          } else if (err?.status === 400) {
            this.errorMessage = 'Email already exists';
          }
        }
    );
  }
}
