import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post.model';
import {Course} from '../models/course.model';
import {PostLike} from '../models/postLike.model';
import {PostComment} from '../models/postComment.model';
import {Advertising} from '../models/Advertising.model';
import {RequestBaseService} from './request-base.service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService extends  RequestBaseService{
  ForumUrl = 'http://localhost:8087/SpringMVC/forum/Get-all-Post';
  aa = 'http://localhost:8087/SpringMVC/forum/add-Post-image/';


  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);

  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.ForumUrl, {headers: this.getHeaders});
  }

  getAdversting(): Observable<Advertising[]> {
    return this.http.get<Advertising[]>('http://localhost:8087/SpringMVC/forum/Get-all-adversting');
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8087/SpringMVC/forum/Get-Post-Comments/' + id);
  }

  addPost(post: Post) {
    return this.http.post<Post>('http://localhost:8087/SpringMVC/forum/add-Post/1', post, {headers: this.getHeaders});
  }

  addPostLike(id: string, postLike: PostLike) {
    return this.http.post<PostLike>('http://localhost:8087/SpringMVC/forum/add-Like-post/' + id + '/1', postLike, {headers: this.getHeaders});
  }

  addPostDisLike(id: string, postLike: PostLike) {
    return this.http.post<PostLike>('http://localhost:8087/SpringMVC/forum/add-DisLike-post/' + id + '/1', postLike, {headers: this.getHeaders});
  }

  addCommentPst(idPost: string, postComment: PostComment) {
    return this.http.post<Comment>('http://localhost:8087/SpringMVC/forum/add-Comment/' + idPost + '/1', postComment, {headers: this.getHeaders});
  }
  addCommentReply(idComm: string, postComment: PostComment) {
    return this.http.post<Comment>('http://localhost:8087/SpringMVC/forum/add-Com-to-Com/' + idComm + '/1', postComment, {headers: this.getHeaders});
  }

  DeletePost(idPost: string) {
    return this.http.delete<Post>('http://localhost:8087/SpringMVC/forum/Delete-Post/' + idPost);

  }

  addImagePost(idPost: string, image: string) {
    return this.http.post<Post>('http://localhost:8087/SpringMVC/forum/add-Post/' + idPost, image);
  }

  Like_Dislike(idPost: string): Observable<number> {
    return this.http.get<number>('http://localhost:8087/SpringMVC/forum/get-user-islike-post/' + idPost);
  }
}
