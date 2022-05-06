import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../../models/course.model';
import {Subscription} from 'rxjs';
import {EventService} from '../../../shared/event.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Event} from '../../../models/event.model';
import {PostComment} from "../../../models/postComment.model";
import {EventcommentModel} from '../../../models/eventcomment.model';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";
import {EventFile} from "../../../models/eventFile";

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {

  //QR
  eventid: number;
  title = 'qrcode';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  //FIN
  myDate = Date.now();
  id: number;
  comment: EventcommentModel = new EventcommentModel();
  event: Event;
  display = false;
  fileToUpload: File | null = null;
  eventFiles: EventFile[];

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.event = new Event();
    this.eventService.getEventById(this.id).subscribe(data => {
      this.event = data;
      this.display = true;
      console.log(data);
    });
  }

  cancelParticipation(id: string) {
    this.eventService.cancelParticipation(id).subscribe();
    this.router.navigate(['user/eventFront']).then(() => {
      window.location.reload();
    });
  }

  /* getAdressMap(id: number){
     this.eventService.getAdressByMAP(id).subscribe(data => {
       this.event = data;
       this.display = true;
       console.log(data);
     });
   }*/


  particper(id: string) {
    this.eventService.joindEvent(id).subscribe();
    this.router.navigate(['user/eventFront']).then(() => {
      window.location.reload();
    });
  }

  addCommentEvent(id: string) {
    this.eventService.addCommentPst(id, this.comment).subscribe(p => {
      console.log(this.comment);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

  redirectToPayement() {
    this.router.navigate(['user/payment/', this.id]);

  }





  onFileSelcted(event: any) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload.name);
  }

  onSaveFile() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    // @ts-ignore
    formData.append('reportProgress', true);
    return this.eventService.postFile(this.event.eventId, this.fileToUpload).subscribe();
  }

}




