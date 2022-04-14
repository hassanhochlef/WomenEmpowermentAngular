import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  courseId: string;
  course: Course;
  routeSub: Subscription;
  courseSub: Subscription;
  filtersLoaded: Promise<boolean>;
  constructor(private activatedRoute: ActivatedRoute, private service: CourseService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>
    { this.courseId = params.id;
      this.getCourseDetails(this.courseId);
    });
  }
  getCourseDetails(id: string): void {
    this.courseSub = this.service
        .getCourse(id)
        .subscribe((courseResp: Course) => { console.log(courseResp);
                                             this.course = courseResp;
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
