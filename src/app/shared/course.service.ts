import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../models/course.model';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  coursesUrl = 'http://localhost:8087/SpringMVC/course/getAllCourses';
  constructor(private http: HttpClient) { }
  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.coursesUrl);
  }
  getCourse(id: string): Observable<Course>{
    return this.http.get<Course>('http://localhost:8087/SpringMVC/course/getCourse/' + id );
  }

}