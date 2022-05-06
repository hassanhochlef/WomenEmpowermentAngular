import {Component, OnDestroy, OnInit, SchemaMetadata} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Course} from '../../models/course.model';
import {CourseService} from '../../shared/course.service';
import {User} from '../../models/user.model';
import {Certificate} from '../../models/certificate.model';
import {AuthenticationService} from '../../shared/authentication.service';
import {RequestBaseService} from '../../shared/request-base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Penality} from '../../models/penality.enum';
import {Quiz} from '../../models/Quiz.model';
import {StreamService} from '../../shared/stream.service';
import {QuizQuestion} from '../../models/QuizQuestion.model';
import {Answer} from '../../models/Answer.model';
import {FormControl} from '@angular/forms';
import {cFile} from "../../models/file.model";
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent  extends RequestBaseService implements OnInit, OnDestroy{

  certificate: Certificate[];
  listCours: Course[];
  user: User[];
  courseId: string;
  idUser: string;
  course: Course;
  routeSub: Subscription;
  courseSub: Subscription;
  filtersLoaded: Promise<boolean>;
  myScriptElement: HTMLScriptElement;
  myScriptElement2: HTMLScriptElement;
  myDivElement: HTMLTextAreaElement;
  session: WindowSessionStorage;
  onlineUser: User;
  eventHourcontrol: FormControl = new FormControl();
  statuses: any[];
  div: HTMLElement;
  streamKey = '';
  ccCourses: Course[];
  bannedpart: User[];
  pen: Penality[] = [];
  quizez: Quiz[];
  quiz: Quiz = new Quiz();
  questions: QuizQuestion[] = [];
  answers: Answer[] = [];
  question1 = new QuizQuestion();
  question2 = new QuizQuestion();
  question3 = new QuizQuestion();
  answer1 = new Answer();
  answer2 = new Answer();
  answer3 = new Answer();
  answer4 = new Answer();
  answer5 = new Answer();
  answer6 = new Answer();
  answer7 = new Answer();
  answer8 = new Answer();
  answer9 = new Answer();
  eventName: string;
  eventHour: number;
  eventMinutes: number;
  eventDate: Date;
  fieldTextType: boolean;
  fileToUpload: File | null = null;
  courseFiles: cFile[];
  public xx: string = null;
  fileName = '';
  private certresp: object;
  private blobres: ArrayBufferView | ArrayBuffer | Blob | string;
  constructor(private activatedRoute: ActivatedRoute,
              authenticationService: AuthenticationService,
              private service: CourseService, private chanelService: StreamService,
              private router: Router,
              http: HttpClient)
  {
  super(authenticationService, http);
  this.myScriptElement = document.createElement('script');
  this.myScriptElement.src = 'https://cdn.hesp.live/player/embed.js';
  document.body.appendChild(this.myScriptElement);
  this.myScriptElement2 = document.createElement('script');
  this.myScriptElement2.src = 'https://unpkg.com/@nylas/components-agenda';
  document.head.appendChild(this.myScriptElement2);
  this.onlineUser = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>
    { this.courseId = params.id;
      this.getCourseDetails(this.courseId);
      this.getCourseParticipant(this.courseId);
      this.getCertificate(this.courseId);
      this.getCreatedCourses(this.onlineUser.userId.toString());
      this.getBannedParticipants(this.courseId);
      this.getQuizez(this.courseId);
      this.getChannel(this.courseId);
      this.getFiles();
      this.pen = [Penality.KICK, Penality.WARNING, Penality.SANCTION ];
    });
    this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'}
    ];
    console.log(this.ccCourses);
  }
  changebutton(){
    this.fieldTextType = !this.fieldTextType;
  }
  addSanction(idUser: string, idCourse: string, pena: Penality){
    this.service.addSanction(idUser, idCourse , pena).subscribe(res => (console.log('added')));
  }

  addQuiz(){
    this.answers.push(this.answer1, this.answer2, this.answer3);
    this.question1.answers = this.answers;
    this.answers = [];
    this.answers.push(this.answer5, this.answer5, this.answer6);
    this.question2.answers = this.answers;
    this.answers = [];
    this.answers.push(this.answer7, this.answer8, this.answer9);
    this.question3.answers = this.answers;
    this.questions.push(this.question1, this.question2, this.question3);
    this.quiz.questions = this.questions;
    this.service.addQuiz(this.course.courseId.toString(), this.quiz).subscribe();
    console.log(this.quiz);
    this.answers = [];
    this.questions = [];
    console.log(this.quiz);
  }
  joinCourse(idCourse: string){
    this.service.joinCourse(idCourse).subscribe(res => (console.log(res)));
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  getCourseParticipant(id: string): void{
   this.courseSub = this.service
       .getCourseParticipants(id)
       .subscribe(courseResp => {
                                      this.user = courseResp;
                                      this.filtersLoaded = Promise.resolve(true);
                                    });
  }
  getCertificate(idCourse: string): void{
    this.courseSub = this.service
        .getCertificate(idCourse)
        .subscribe(courseResp => {
          this.certificate = courseResp;
        });
  }
  getCreatedCourses(idUser: string): void{
    this.courseSub = this.service
        .getCreatedCourse(idUser)
        .subscribe(courseResp => {
          this.ccCourses = courseResp;
        });

  }
  getBannedParticipants(idcourse: string): void{
    this.courseSub = this.service
        .getBannedparticipant(idcourse)
        .subscribe(courseResp => {
          this.bannedpart = courseResp;
        });
  }
  updateCourse(idCourse: string){
    this.service.updateCourse(this.course.courseId.toString(), this.course).subscribe();
  }
  getFiles(){
    this.service.getCourseFiles().subscribe(fileresp => {this.courseFiles = fileresp; });

  }
  getFile(id: string, filename: string){
    this.service.getfile(id).subscribe(blobres =>  {console.log(blobres); });
    const file = this.blobres;
    const url = window.URL.createObjectURL(new Blob([ this.blobres as BlobPart]));
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none');
    link.href = url;
    link.download =  filename;
    link.click();
  }
  getCert(idCertificate: number){
    this.service.getAqCertificate(idCertificate).subscribe(blobres =>  {console.log(blobres); this.certresp = blobres; });
    const file = this.certresp;
    const url = window.URL.createObjectURL(new Blob([this.certresp as BlobPart], { type: 'application/pdf' }));
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none');
    link.href = url;
    link.download = 'certificate.pdf';
    link.click();
  }
  onFileSelcted(event: any){
        this.fileToUpload = event.target.files[0];

      }
      onSaveFile(){
        const formData = new FormData();
        formData.append('file', this.fileToUpload);
        // @ts-ignore
        formData.append('reportProgress', true);
        return this.service.postFile(this.courseId, this.fileToUpload).subscribe();
      }
  getCourseResult(idUser: string, idCourse: string){
    this.service.getCourseResult(idUser, idCourse);
  }
  gotoQuiz(id: string){
    this.router.navigate(['/quiz', id]);
  }
  deleteCourse(id: string): void{
    this.service.deleteCourse(id).subscribe(() => this.service.getCourses().subscribe(res => {console.log(res); this.listCours = res; }));
    this.router.navigate(['/cour']);
  }
  getChannel(id: string): void {
    this.chanelService.getChannel(id).subscribe(chanelResp =>
    {
      this.streamKey = chanelResp;
      console.log(this.streamKey);
    });
  }
  getCourseDetails(id: string): void {
    this.courseSub = this.service
        .getCourse(id)
        .subscribe(courseResp => {
                                             this.course = courseResp;
                                             this.xx = this.course.channelId;
                                             this.filtersLoaded = Promise.resolve(true);
        });
  }
  getQuizez(idCourse: string): void {
    this.courseSub = this.service
        .getQuizez(idCourse)
        .subscribe(quizResp => {
          this.quizez = quizResp;
        });
  }
  addStream(idCourse: string){
    this.chanelService.createChannel( idCourse).subscribe();
  }
  addEvent(){
    this.service.addEvent(this.courseId, this.eventName, this.eventHour, this.eventMinutes, this.eventDate).subscribe();
  }
  deleteStream(idCourse: string){
    this.chanelService.deleteChannel( idCourse)
        .subscribe(() => this.service.getCourses().subscribe(res => {console.log(res); this.listCours = res; }));
    console.log(this.course.channelId);
  }
  startSteam(idCourse: string){
    this.chanelService.startChannel( idCourse).subscribe();
  }
  endStream(idCourse: string){
    this.chanelService.endChannel( idCourse).subscribe();
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
