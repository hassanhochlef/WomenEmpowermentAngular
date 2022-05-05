import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import {EventService} from '../../shared/event.service';
import {Router} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-event-front',
  templateUrl: './event-front.component.html',
  styleUrls: ['./event-front.component.scss'],
})
export class EventFrontComponent implements OnInit {
  p: number = 1;
  nameSearch: string= '';
  events: Event[];
  event: Event = new Event();
  bestdonor: any[];
  display = false;
  constructor(private eventService: EventService, private router: Router) {
  }

  ngOnInit(): void {
    this.getEvent();
    this.getBestdONOR();
  }

  private getBestdONOR(){
    this.eventService.GETbESTdONOR().subscribe(eventsRslt => {
      this.bestdonor = eventsRslt;
      console.log( this.bestdonor);
    });
  }

  private getEvent() {
    this.eventService.getEventList().subscribe(eventsRslt => {
      this.events = eventsRslt;
      console.log(this.events);
      this.display = true;
    });
  }

  addEvent() {
    this.eventService.createEvent2(this.event).subscribe(() => this.router.navigateByUrl('user/eventFront'));
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
