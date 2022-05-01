import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../models/course.model';
import {User} from "../models/user.model";
import {Certificate} from "../models/certificate.model";
import {AuthenticationService} from "./authentication.service";
import {RequestBaseService} from "./request-base.service";
import { Penality } from '../models/penality.enum';
import {Quiz} from "../models/Quiz.model";
import {cFile} from "../models/file.model";
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
  getfile(id: string){
    return this.http.get('http://localhost:8087/SpringMVC/file/file/' + id);
  }
  joinCourse(idCourse: string){
      return this.http.post('http://localhost:8087/SpringMVC/course/joinCourse/' + idCourse, null, {headers: this.getHeaders});
  }
  getAqCertificate(certificateId: number){
    return this.http.post('http://localhost:8087/SpringMVC/Certificate/certifGen/' + certificateId, null, {headers: this.getHeaders});
}
  postFile(courseId: string, file: File){
    const formParams = new FormData();
    // @ts-ignore
    formParams.append('file', file);
    const options: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };
    return this.http.post('http://localhost:8087/SpringMVC/file/upload/' + courseId, formParams);
  }
getCourseFiles(): Observable<cFile[]> {
    return this.http.get<cFile[]>('http://localhost:8087/SpringMVC/file/files');
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
  addQuiz(idCourse: string, quiz: Quiz){
    return this.http.post('http://localhost:8087/SpringMVC/quiz/createQuiz/' + idCourse, quiz, {headers: this.getHeaders});
  }
  addAnswer(idAnswer: number){
    return this.http.post('http://localhost:8087/SpringMVC/quiz/answerQuestion/' + idAnswer, null, {headers: this.getHeaders} );
  }
  updateCourse(idCourse: string, course: Course){
    return this.http.put<Course>('http://localhost:8087/SpringMVC/course/editCourse/' + idCourse, course, {headers: this.getHeaders});
  }
  getEvents(calId: string): Observable<Event[]>{
    return this.http.get<Event[]>('http://localhost:8087/SpringMVC/CourseEvent/getEvents/' + calId, {headers: this.getHeaders});
  }
  addEvent(courseId: string, eventName: string, hour: number, minutes: number, date: Date ){
    return this.http.post('http://localhost:8087/SpringMVC/CourseEvent/addEvent/' + courseId + '/' + eventName +  '/' +
         hour + '/' + minutes + '/' + date,
        null, {headers: this.getHeaders} );

  }
}
