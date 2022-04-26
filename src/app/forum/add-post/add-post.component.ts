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
  constructor(private cs: ForumService, private router: Router) { }
  addPost(){
    this.cs.addPost(this.post).subscribe(() => this.router.navigateByUrl('/forum'));
    console.log(this.post.postTitle);
  }

  ngOnInit(): void {
  }
  addnewpost() {
    this.cs.addPost(this.post).subscribe(p => {
      console.log(p);
      this.router.navigate(['user/forum']).then(() => {
        window.location.reload();
      });
    });


  }
}
