import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';
import {User} from "../../models/user.model";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  listCours: Course[];
  user: User[];
  courseId: string;
  course: Course;
  routeSub: Subscription;
  courseSub: Subscription;
  filtersLoaded: Promise<boolean>;
  myScriptElement: HTMLScriptElement;
  mydivElement: HTMLDivElement;
  myLinkElement: HTMLLinkElement;
  statuses: any[];
    public xx: string = null;
  constructor(private activatedRoute: ActivatedRoute, private service: CourseService, private router: Router) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = 'https://cdn.hesp.live/player/embed.js';
    document.body.appendChild(this.myScriptElement);

  }
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>
    { this.courseId = params.id;
      this.getCourseDetails(this.courseId);
      this.getCourseParticipant(this.courseId);
    });
    this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'}
    ];
  }
  getCourseParticipant(id: string): void{
   this.courseSub = this.service
       .getCourseParticipants(id)
       .subscribe(courseResp => {
                                      this.user = courseResp;
                                      this.filtersLoaded = Promise.resolve(true);
                                    });
  }
  deleteCourse(id: string): void{
    this.service.deleteCourse(id).subscribe(() => this.service.getCourses().subscribe(res => {console.log(res); this.listCours = res; }));

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

  ngOnDestroy(): void{
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
    if (this.courseSub){
      this.courseSub.unsubscribe();
    }

  }

}
