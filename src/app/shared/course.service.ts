import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../models/course.model';
import {User} from "../models/user.model";
import {Certificate} from "../models/certificate.model";
import {AuthenticationService} from "./authentication.service";
import {RequestBaseService} from "./request-base.service";
@Injectable({
  providedIn: 'root'
})
export class CourseService  extends  RequestBaseService{
  coursesUrl = 'http://localhost:8087/SpringMVC/course/getAllCourses';
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }
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
    return this.http.delete('http://localhost:8087/SpringMVC/course/removeCourse/' + id, {headers: this.getHeaders} );
  }
  getCreatedCourse(idUser: string): Observable<Course[]>{
    return this.http.get<Course[]>('http://localhost:8087/SpringMVC/course/getCreatedCourses/' + idUser, {headers: this.getHeaders});
  }
  getCertificate(idCourse: string): Observable<Certificate[]>{
    return this.http.get<Certificate[]>('http://localhost:8087/SpringMVC/course/getuserCertif/' + idCourse);
  }
  getBannedparticipant(idCourse: string): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8087/SpringMVC/course/getBannedParticipants/' + idCourse);
  }
}
