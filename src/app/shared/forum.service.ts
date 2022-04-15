import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post.model';
import {Course} from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  ForumUrl = 'http://localhost:8087/SpringMVC/forum/Get-all-Post';
  constructor(private http: HttpClient) { }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.ForumUrl);
  }
    getComments(id: number): Observable<Comment>{
      return this.http.get<Comment>('http://localhost:8087/SpringMVC/forum/Get-Post-Comments/' + id );
    }

}
