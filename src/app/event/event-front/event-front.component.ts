import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import {EventService} from '../../shared/event.service';

@Component({
  selector: 'app-event-front',
  templateUrl: './event-front.component.html',
  styleUrls: ['./event-front.component.scss']
})
export class EventFrontComponent implements OnInit {
  events: Event[];
  event: Event;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getEvent();
  }


  private getEvent() {
    this.eventService.getEventList().subscribe(eventsRslt => {
      this.events = eventsRslt;
      console.log(this.events);
    });
  }
}
