import { Component, OnInit } from '@angular/core';
import {ForumService} from '../../shared/forum.service';
import {Post} from '../../models/post.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  post: Post = new Post();
  errorMessage: string = "";

  constructor(private cs: ForumService, private router: Router) {
  }

  addPost() {
    this.cs.addPost(this.post).subscribe(() => this.router.navigateByUrl('/forum'));
    console.log(this.post.postTitle);
  }

  ngOnInit(): void {
  }

  addnewpost() {
    this.cs.addPost(this.post).subscribe(data => {
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


}

