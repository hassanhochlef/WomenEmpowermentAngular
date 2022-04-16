import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../models/course.model';
import {User} from "../models/user.model";
import {Certificate} from "../models/certificate.model";
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
  addCourse(course: Course){
    return this.http.post<Course>('http://localhost:8087/SpringMVC/course/addCourse/1', course);
  }
  getCourseParticipants(id: string): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8087/SpringMVC/course/getAllParticipants/' + id );
  }
  deleteCourse(id: string){
    return this.http.delete('http://localhost:8087/SpringMVC/course/removeCourse/' + id );
  }
  getCertificate(idCourse: string): Observable<Certificate[]>{
    return this.http.get<Certificate[]>('http://localhost:8087/SpringMVC/course/getuserCertif/' + idCourse);
  }
}
