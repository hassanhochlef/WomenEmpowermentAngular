import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import {EventService} from '../../shared/event.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-front',
  templateUrl: './event-front.component.html',
  styleUrls: ['./event-front.component.scss']
})
export class EventFrontComponent implements OnInit {
  events: Event[];
  event: Event = new Event();

  constructor(private eventService: EventService, private router: Router) {
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

  addEvent() {
    this.eventService.createEvent2(this.event).subscribe(() => this.router.navigateByUrl('/eventFront'));
    console.log();
  }

  addNewEvent() {
    this.eventService.createEvent2(this.event).subscribe(p => {
      console.log(p);

    });
    this.router.navigate(['user/eventFront']).then(() => {
      window.location.reload();
    });


  }
  deleteEvent(id: number) {
    this.eventService.deletEvent(id).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['user/eventFront']).then(() => {
      window.location.reload();
    });

  }
  openDetails(id: number): void {
    this.router.navigate(['user/detailEvent/', id]);
  }
}
