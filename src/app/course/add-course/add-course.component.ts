import {Component, OnInit} from '@angular/core';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';
import {Router} from '@angular/router';
import {Domain} from '../../models/domain.enum';
import {Subscription} from 'rxjs';
import {User} from '../../models/user.model';
import {RequestBaseService} from '../../shared/request-base.service';
import {AuthenticationService} from '../../shared/authentication.service';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent extends RequestBaseService implements OnInit {
  domain: Domain[] = [];
  course: Course =  new Course();
  ccCourses: Course[];
  courseSub: Subscription;
  onlineUser: User;
  errorMessage = '';
  constructor(private cs: CourseService, http: HttpClient, authenticationService: AuthenticationService,
              private router: Router ) {
    super(authenticationService, http);
    this.onlineUser = this.authenticationService.currentUserValue;
    }
  addCourse(){
    this.cs.addCourse(this.course).subscribe(data => { this.router.navigate(['/cour']).then(() => {
      window.location.reload();
    }); }, err => {
                            if (err?.status === 417)
                            {
                              this.errorMessage = 'End date cannot be before start date';
                            }
                            else if (err?.status === 403)
                            {
                              this.errorMessage = 'Maximum ongoing courses limit is 2';
                            }
    }
    );
  }

  ngOnInit(): void {
    this.domain = [Domain.AGRICULTURE, Domain.ARTISANAL, Domain.IT, Domain.TECH, Domain.MEDICAL, Domain.SOCIAL];
    this.getCreatedCourses(this.onlineUser.userId.toString());
  }
  getCreatedCourses(idUser: string): void{
    this.courseSub = this.cs
        .getCreatedCourse(idUser)
        .subscribe(courseResp => {
          this.ccCourses = courseResp;
        });

  }
  openGameDetails(id: string): void {
    this.router.navigate(['/details', id]);
  }


}
