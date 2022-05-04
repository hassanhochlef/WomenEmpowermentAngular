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
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-back-home',
  templateUrl: './course-back-home.component.html',
  styleUrls: ['./course-back-home.component.scss']
})
export class CourseBackHomeComponent extends RequestBaseService implements OnInit, OnDestroy {
users: User[];
courses: Course[];
certificate: Certificate[];
certifiCates: Certificate[];
Certifn = 0;
role: Role[] = [];
CertificatesCount: number;
formers: number ;
pieData: any;
  constructor(private activatedRoute: ActivatedRoute, authenticationService: AuthenticationService,
              private service: CourseService, private userservice: UserService,
              private router: Router,
              http: HttpClient) {
    super(authenticationService, http);
  }

  ngOnInit(): void {
    this.role = [Role.FORMER, Role.COMPANY, Role.ADMIN, Role.ASSOCIATION, Role.USER, Role.EXPERT];
    this.getlistOfUsers();
    this.getlistofCertificates();
    this.getlistofCourses();
    this.getFormersNb();
    this.pieData = {
      labels: [ 'Aquired', 'Not Aquired'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
          ]
        }]
    };
  }
  getlistOfUsers(){
    this.userservice.getAllUser().subscribe(userresp => {this.users = userresp; console.log(userresp); });
  }
  getlistofCourses(){
    this.service.getCourses().subscribe(courseresp => {this.courses = courseresp; console.log(courseresp); }) ;
  }
  getlistofCertificates(){
  this.service.getCertificates().subscribe(certifResp => {this.certifiCates = certifResp ; } ) ;
  }
  getFormersNb(): Observable<object> {
    return this.service.getFormersNb();
  }
  ngOnDestroy() {
  }

}
