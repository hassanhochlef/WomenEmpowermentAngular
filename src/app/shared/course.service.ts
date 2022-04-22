import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../models/course.model';
import {User} from "../models/user.model";
import {Certificate} from "../models/certificate.model";
import {AuthenticationService} from "./authentication.service";
import {RequestBaseService} from "./request-base.service";
import { Penality } from '../models/penality.enum';
import {Quiz} from "../models/Quiz.model";
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
  addSanction(idUser: string, idCourse: string, pena: Penality){
    return this.http.post('http://localhost:8087/SpringMVC/api/SanctionLearner/addSanction/' + idUser + '/' + idCourse + '/' + pena
        , null,
        {headers: this.getHeaders} );
  }
  joinCourse(idCourse: string){
      return this.http.post('http://localhost:8087/SpringMVC/course/joinCourse/' + idCourse, null, {headers: this.getHeaders});
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
  getQuizez(idCourse: string): Observable<Quiz[]>{
    return this.http.get<Quiz[]>('http://localhost:8087/SpringMVC/quiz/getQuizez/' + idCourse, {headers: this.getHeaders});
  }
  addAnswer(idAnswer: number){
    return this.http.post('http://localhost:8087/SpringMVC/quiz/answerQuestion/' + idAnswer, null, {headers: this.getHeaders} );
  }
  updateCourse(idCourse: string, course: Course){
    return this.http.put<Course>('http://localhost:8087/SpringMVC/course/editCourse/' + idCourse, course, {headers: this.getHeaders});
  }
}
