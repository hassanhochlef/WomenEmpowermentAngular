import {Component, OnInit} from '@angular/core';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';
import {Router} from '@angular/router';
import {Domain} from "../../models/domain.enum";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  domain: Domain[] = [];
  course: Course =  new Course();
  constructor(private cs: CourseService, private router: Router) {
    }
  addCourse(){
    this.cs.addCourse(this.course).subscribe(() => this.router.navigateByUrl('/cour'));
    console.log(this.course.courseName);
  }
  ngOnInit(): void {
    this.domain = [Domain.AGRICULTURE, Domain.ARTISANAL, Domain.IT, Domain.TECH, Domain.MEDICAL, Domain.SOCIAL];
  }


}
