import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestBaseService} from "../../../shared/request-base.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../shared/authentication.service";
import {CourseService} from "../../../shared/course.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../shared/user.service";
import {User} from "../../../models/user.model";
import {Role} from "../../../models/role.enum";
import { Course } from 'src/app/models/course.model';
import {Certificate} from "../../../models/certificate.model";

@Component({
  selector: 'app-course-back-home',
  templateUrl: './course-back-home.component.html',
  styleUrls: ['./course-back-home.component.scss']
})
export class CourseBackHomeComponent extends RequestBaseService implements OnInit, OnDestroy {
users: User[];
courses: Course[];
certificate: Certificate[];
Certifn: number;
  role: Role[] = [];
  CertificatesCount: number;
  onGoing: number;
  constructor(private activatedRoute: ActivatedRoute, authenticationService: AuthenticationService,
              private service: CourseService, private userservice: UserService,
              private router: Router,
              http: HttpClient) {
    super(authenticationService, http);
  }

  ngOnInit(): void {
    this.role = [Role.FORMER, Role.COMPANY, Role.ADMIN, Role.ASSOCIATION, Role.USER, Role.EXPERT];
    this.getlistOfUsers();
    this.getlistofCourses();
    this.getonGoingCourses();
    this.getsomething();
  }
  getlistOfUsers(){
    this.userservice.getAllUser().subscribe(userresp => {this.users = userresp; console.log(userresp); });
  }
  getonGoingCourses(): number{
    this.onGoing = 0;
    for (let i = 0 ; i <= this.courses.length.valueOf() ; i++){
      if (this.courses[i].onGoing === true){
        this.onGoing = this.onGoing + 1 ;
      }
    }
    return this.onGoing;
  }
  getlistofCourses(){
    this.service.getCourses().subscribe(courseresp => {this.courses = courseresp; }) ;
  }
  getsomething(): number{
    for (let i = 0 ; i <= this.courses.length.valueOf() ; i++){
     this.service.getCertificate(this.courses[i].courseId.toString()).subscribe(
         cerresp => {this.Certifn = this.Certifn + cerresp.length; }) ;
     this.CertificatesCount = this.CertificatesCount + this.Certifn ;
      }
    return this.CertificatesCount;
  }
  ngOnDestroy() {
  }

}
