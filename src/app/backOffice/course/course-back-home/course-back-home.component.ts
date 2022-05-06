import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestBaseService} from "../../../shared/request-base.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../shared/authentication.service";
import {CourseService} from "../../../shared/course.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../shared/user.service";
import {User} from "../../../models/user.model";
import {Role} from "../../../models/role.enum";
import {Course} from 'src/app/models/course.model';
import {Certificate} from "../../../models/certificate.model";
import {Observable} from "rxjs";
import {Domain} from "../../../models/domain.enum";
import {Customer} from "../../../demo/domain/customer";

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
domain: Domain[] = [];
role: Role[] = [];
ITcourses: Course[];
techCourses: Course[];
MedicalCourses: Course[];
ArtisanalCourses: Course[];
AgricultureCourses: Course[];
SocialCourses: Course[];
CertificatesCount: number;
endcNumber: number;
goingcNumber: number;
formers: number ;
pieData: any;
pieData1: any;
  selectedCustomers1: Customer[];
  selectedCustomer: Customer;
onGoingCourses: Course[];
EndedCourses: Course[];
  rowGroupMetadata: any;
  ordersChartOptions: any ;
  ordersChart: any;
  revenueChart: any;
  constructor(private activatedRoute: ActivatedRoute, authenticationService: AuthenticationService,
              private service: CourseService, private userservice: UserService,
              private router: Router,
              http: HttpClient) {
    super(authenticationService, http);
    this.getlistOfUsers();
    this.getlistofCourses();
    this.getFormersNb();
  }

  ngOnInit(): void {
    this.role = [Role.FORMER, Role.COMPANY, Role.ADMIN, Role.ASSOCIATION, Role.USER, Role.EXPERT];
    this.domain = [Domain.IT, Domain.SOCIAL, Domain.TECH, Domain.MEDICAL, Domain.AGRICULTURE, Domain.ARTISANAL];
    this.service.getOngoingCourses().subscribe( ongoing => {
      this.onGoingCourses = ongoing;
      this.service.getEndedCourses().subscribe( ongoing1 => {
        this.EndedCourses = ongoing1;
        this.pieData = {
          labels: ['OnGoing', 'Ended'],
          datasets: [
            {
              data: [ this.onGoingCourses.length, this.EndedCourses.length],
              backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
              ]
            }]
        };
      });
    });
    this.service.getCertificates().subscribe(certifResp => {
      this.certifiCates = certifResp ;
      this.service.getAquiredCertif().subscribe(resp => {
      this.CertificatesCount = resp ;
      this.revenueChart = {
          labels: ['Aquired', 'Not aquired'],
          datasets: [{
            data: [this.CertificatesCount, this.certifiCates.length - this.CertificatesCount],
            backgroundColor: ['#64B5F6', '#7986CB']
          }]
        };
      });
    });
    this.service.getCourseByDomain(this.domain[0].toString()).subscribe(domResp => {
      this.ITcourses = domResp ;
      this.service.getCourseByDomain(this.domain[2].toString()).subscribe(domResp1 => {
      this.techCourses = domResp1 ;
      this.service.getCourseByDomain(this.domain[3].toString()).subscribe(domResp2 => {
      this.MedicalCourses = domResp2 ;
      this.service.getCourseByDomain(this.domain[1].toString()).subscribe(domResp3 => {
      this.SocialCourses = domResp3 ;
      this.service.getCourseByDomain(this.domain[4].toString()).subscribe(domResp4 => {
      this.AgricultureCourses = domResp4 ;
      this.service.getCourseByDomain(this.domain[5].toString()).subscribe(domResp5 => {
      this.ArtisanalCourses = domResp5 ;
      this.pieData1 = {
          labels: ['IT', 'SOCIAL', 'ARTISANAL', 'MEDICAL', 'AGRICULTURE', 'TECH'],
          datasets: [
            {
              label: 'Course Fields',
              backgroundColor: 'rgba(54, 162, 235,0.2)',
              borderColor: 'rgba(54, 162, 235,1)',
              pointBackgroundColor: 'rgba(54, 162, 235,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235,1)',
              data:
                  [
                      this.ITcourses.length,
                      this.SocialCourses.length,
                      this.ArtisanalCourses.length,
                      this.MedicalCourses.length,
                      this.AgricultureCourses.length,
                      this.techCourses.length
                  ]
            }
          ]
        };
      });
      });
      });
      });
      });
    });
  }
  getlistOfUsers(){
    this.userservice.getAllUser().subscribe(userresp => {this.users = userresp; console.log(userresp); });
  }
  getlistofCourses(){
    this.service.getCourses().subscribe(courseresp => {this.courses = courseresp; console.log(courseresp); }) ;
  }
  getFormersNb(): Observable<object> {
    return this.service.getFormersNb();
  }
  ngOnDestroy() {
  }

}
