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
  imagen: File;
  imagenMin: File;
  bestdonor: any[];
  display = false;
  fileToUpload: File | null = null;
  idEvent: number;
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
    this.router.navigate(['/eventFront']).then(() => {
      window.location.reload();
    });

  }
  openDetails(id: number): void {
    this.router.navigate(['/detailEvent/', id]);
  }
  updateEvent(idEvent: string){
    this.eventService.updateEvent(this.idd.toString(), this.event).subscribe(p =>{
      console.log();
    });
    this.router.navigate(['/eventFront']).then(() => {
      window.location.reload();
    });
  }
  idd: string;
  openupdate(id: string){this.idd = id;}



  onFileSelcted(event: any){
    this.fileToUpload = event.target.files[0];

  }
  onSaveFile(){
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    // @ts-ignore
    formData.append('reportProgress', true);
    return this.eventService.postFile(this.idEvent, this.fileToUpload).subscribe();
  }

}


