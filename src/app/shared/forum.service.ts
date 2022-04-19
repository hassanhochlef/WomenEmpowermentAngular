import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post.model';
import {Course} from '../models/course.model';
import {PostLike} from '../models/postLike.model';
import {PostComment} from '../models/postComment.model';
import {Advertising} from '../models/Advertising.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  ForumUrl = 'http://localhost:8087/SpringMVC/forum/Get-all-Post';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.ForumUrl);
  }

  getAdversting(): Observable<Advertising[]> {
    return this.http.get<Advertising[]>('http://localhost:8087/SpringMVC/forum/Get-all-adversting');
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8087/SpringMVC/forum/Get-Post-Comments/' + id);
  }

  addPost(post: Post) {
    return this.http.post<Post>('http://localhost:8087/SpringMVC/forum/add-Post/1', post);
  }

  addPostLike(id: string, postLike: PostLike) {
    return this.http.post<PostLike>('http://localhost:8087/SpringMVC/forum/add-Like-post/' + id + '/1', postLike);
  }

  addPostDisLike(id: string, postLike: PostLike) {
    return this.http.post<PostLike>('http://localhost:8087/SpringMVC/forum/add-DisLike-post/' + id + '/1', postLike);
  }

  addCommentPst(idPost: string, postComment: PostComment) {
    return this.http.post<Comment>('http://localhost:8087/SpringMVC/forum/add-Comment/' + idPost + '/1', postComment);
  }

  DeletePost(idPost: string) {
    return this.http.delete<Post>('http://localhost:8087/SpringMVC/forum/Delete-Post/' + idPost);

  }
}
