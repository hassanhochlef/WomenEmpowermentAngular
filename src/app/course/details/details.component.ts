import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';
import {User} from "../../models/user.model";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  events: any[];

  options: any;

  header: any;

  eventDialog: boolean;

  changedEvent: any;

  clickedEvent = null;
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
    this.changedEvent = {title: '', start: null, end: '', allDay: null};

    this.options = {
      plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      defaultDate: '2017-02-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      eventClick: (e) => {
        this.eventDialog = true;

        this.clickedEvent = e.event;

        this.changedEvent.title = this.clickedEvent.title;
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end;
      }
    };
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
  save() {
    this.eventDialog = false;

    this.clickedEvent.setProp('title', this.changedEvent.title);
    this.clickedEvent.setStart(this.changedEvent.start);
    this.clickedEvent.setEnd(this.changedEvent.end);
    this.clickedEvent.setAllDay(this.changedEvent.allDay);

    this.changedEvent = {title: '', start: null, end: '', allDay: null};
  }

  reset() {
    this.changedEvent.title = this.clickedEvent.title;
    this.changedEvent.start = this.clickedEvent.start;
    this.changedEvent.end = this.clickedEvent.end;
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
