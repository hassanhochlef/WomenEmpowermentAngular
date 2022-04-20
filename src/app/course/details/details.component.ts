import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';
import {User} from '../../models/user.model';
import {Certificate} from '../../models/certificate.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {RequestBaseService} from '../../shared/request-base.service';
import {HttpClient} from '@angular/common/http';
import {Penality} from '../../models/penality.enum';
import {Quiz} from "../../models/Quiz.model";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent  extends RequestBaseService implements OnInit, OnDestroy{
  certificate: Certificate[];
  listCours: Course[];
  user: User[];
  courseId: string;
  idUser: string;
  course: Course;
  routeSub: Subscription;
  courseSub: Subscription;
  filtersLoaded: Promise<boolean>;
  myScriptElement: HTMLScriptElement;
  session: WindowSessionStorage;
  onlineUser: User;
  statuses: any[];
  ccCourses: Course[];
  bannedpart: User[];
  pen: Penality[] = [];
  quizez: Quiz[];
  public xx: string = null;
  constructor(private activatedRoute: ActivatedRoute,
              authenticationService: AuthenticationService,
              private service: CourseService,
              private router: Router,
              http: HttpClient)
  {
  super(authenticationService, http);
  this.myScriptElement = document.createElement('script');
  this.myScriptElement.src = 'https://cdn.hesp.live/player/embed.js';
  document.body.appendChild(this.myScriptElement);
  this.onlineUser = this.authenticationService.currentUserValue;


  }
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>
    { this.courseId = params.id;
      this.getCourseDetails(this.courseId);
      this.getCourseParticipant(this.courseId);
      this.getCertificate(this.courseId);
      this.getCreatedCourses(this.onlineUser.userId.toString());
      this.getBannedParticipants(this.courseId);
      this.getQuizez(this.courseId);
      this.pen = [Penality.KICK, Penality.WARNING, Penality.SANCTION ];
    });
    this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'}
    ];
  }
  addSanction(idUser: string, idCourse: string, pena: Penality){
    this.service.addSanction(idUser, idCourse , pena).subscribe(res => (console.log('added')));
  }
  joinCourse(idCourse: string){
    this.service.joinCourse(idCourse).subscribe(res => (console.log(res)));
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  getCourseParticipant(id: string): void{
   this.courseSub = this.service
       .getCourseParticipants(id)
       .subscribe(courseResp => {
                                      this.user = courseResp;
                                      this.filtersLoaded = Promise.resolve(true);
                                    });
  }
  getCertificate(idCourse: string): void{
    this.courseSub = this.service
        .getCertificate(idCourse)
        .subscribe(courseResp => {
          this.certificate = courseResp;
        });
  }
  getCreatedCourses(idUser: string): void{
    this.courseSub = this.service
        .getCreatedCourse(idUser)
        .subscribe(courseResp => {
          this.ccCourses = courseResp;
        });
  }
  getBannedParticipants(idcourse: string): void{
    this.courseSub = this.service
        .getBannedparticipant(idcourse)
        .subscribe(courseResp => {
          this.bannedpart = courseResp;
        });
  }
  deleteCourse(id: string): void{
    this.service.deleteCourse(id).subscribe(() => this.service.getCourses().subscribe(res => {console.log(res); this.listCours = res; }));
    this.router.navigate(['user/cour']);
  }
  getCourseDetails(id: string): void {
    this.courseSub = this.service
        .getCourse(id)
        .subscribe(courseResp => {
                                             this.course = courseResp;
                                             console.log(this.course.channelId);
                                             this.xx = this.course.channelId;
                                             console.log(this.xx);
                                             this.filtersLoaded = Promise.resolve(true);
        });
  }
  getQuizez(idCourse: string): void {
    this.courseSub = this.service
        .getQuizez(idCourse)
        .subscribe(quizResp => {
          this.quizez = quizResp;
        });
  }

  ngOnDestroy(): void{
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
    if (this.courseSub){
      this.courseSub.unsubscribe();
    }

  }

}
