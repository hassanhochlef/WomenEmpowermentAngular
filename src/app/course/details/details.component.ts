import {Component, OnDestroy, OnInit, Sanitizer, SecurityContext} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
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
  constructor(private activatedRoute: ActivatedRoute, private service: CourseService) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = 'https://cdn.hesp.live/player/embed.js';
    document.body.appendChild(this.myScriptElement);

  }
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>
    { this.courseId = params.id;
      this.getCourseDetails(this.courseId);
    });
    this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'}
    ];
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
