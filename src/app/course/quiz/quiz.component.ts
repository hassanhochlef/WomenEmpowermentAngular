import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../models/Quiz.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticationService} from "../../shared/authentication.service";
import {CourseService} from "../../shared/course.service";
import {HttpClient} from "@angular/common/http";
import {RequestBaseService} from "../../shared/request-base.service";
import {User} from "../../models/user.model";
import {Penality} from "../../models/penality.enum";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent extends RequestBaseService implements OnInit {
  quizez: Quiz[];
  onlineUser: User;
  courseId: string;
  routeSub: Subscription;
  courseSub: Subscription;
  option: number[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              authenticationService: AuthenticationService,
              private service: CourseService,
              private router: Router,
              http: HttpClient) {
    super(authenticationService, http);
    this.onlineUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>
    { this.courseId = params.id;
      this.getQuizez(this.courseId);

    });
  }
  getQuizez(idCourse: string): void {
    this.courseSub = this.service
        .getQuizez(idCourse)
        .subscribe(quizResp => {
          this.quizez = quizResp;
        });
  }
  addAnswers(){
    for (let i = 0; i <= this.option.length; i++){
      if (i % 2 !== 0) {
        this.service.addAnswer(this.option[i]).subscribe();
        console.log(this.option[i]);
        console.log('ADDED');
      }
    }

  }
  getQuestionAnswer(idQuestion: number, idAnswer: number){
    for (let i = 0; i <= this.option.length; i++) {
      if (i % 2 === 0 && this.option[i] === idQuestion ){
        this.option.splice(i, 2);
      }
    }
    this.option.push(idQuestion, idAnswer);
    console.log(this.option);
  }

}
