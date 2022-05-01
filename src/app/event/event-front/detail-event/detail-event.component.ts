import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../../models/course.model';
import {Subscription} from 'rxjs';
import {EventService} from '../../../shared/event.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Event} from '../../../models/event.model';
import {PostComment} from "../../../models/postComment.model";
import {EventcommentModel} from '../../../models/eventcomment.model';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {
  myDate = Date.now();
  id: number;
  comment: EventcommentModel = new EventcommentModel();
  event: Event;
  display = false;
  constructor(private eventService: EventService, private route: ActivatedRoute , private router: Router ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.event = new Event();
    this.eventService.getEventById(this.id).subscribe(data =>{
      this.event = data;
      this.display = true;
      console.log(data);
    });
  }
  particper(id: string){
  this.eventService.joindEvent(id).subscribe();
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
}
