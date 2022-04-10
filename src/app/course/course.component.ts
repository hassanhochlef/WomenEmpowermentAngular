import {Component, OnInit, Output, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Course} from '../models/course.model';
import {CourseService} from '../shared/course.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit, OnDestroy {
  listCours: Course[];
  private routeSub: Subscription;

  constructor(private router: Router, private service: CourseService ) { }

  ngOnInit(): void {

    this.routeSub = this.service.getCourses().subscribe(res => {console.log(res); this.listCours = res; });

  }
  openGameDetails(id: string): void {
    this.router.navigate(['/details', id]);
  }
  ngOnDestroy(): void {
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
