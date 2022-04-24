import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../../models/course.model';
import {Subscription} from 'rxjs';
import {EventService} from '../../../shared/event.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Event} from '../../../models/event.model';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {
  id: number;
  event: Event;
  display = false;
  constructor(private eventService: EventService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.event = new Event();
    this.eventService.getEventById(this.id).subscribe(data =>{
      this.event = data;
      this.display = true;
      console.log(data);
    });
  }




}
