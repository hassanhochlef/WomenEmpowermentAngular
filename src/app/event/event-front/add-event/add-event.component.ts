import { Component, OnInit } from '@angular/core';
import {Event} from '../../../models/event.model';
import {EventService} from '../../../shared/event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  event: Event = new Event();
  latLng;
  constructor( private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
  }
  /*addNewEvent() {
    this.eventService.createEvent(this.event).subscribe(p => {
      console.log(p);
      window.location.reload();

    });
    this.router.navigate(['http://localhost:4200/#/user/eventFront']).then(() => {
      window.location.reload();
    });


  }*/
    addEvent() {
    this.event.lang = this.latLng.lng;
    this.event.latitude = this.latLng.lat;
    this.eventService.createEvent2(this.event).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['/eventFront']).then(() => {
      window.location.reload();
    });
  }

  getLatLng(event){
    console.log('we are in parent component');
    console.log(event);
    this.latLng = event;
  }
  goToDashbord(){
    this.router.navigate(['http://localhost:4200/#/user/eventFront']);
  }
  url = 'https://img.icons8.com/ios/100/000000/contract-job.png';
  onSelect(event) {
    const fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }
  redirectToDashborEvent(){
    this.router.navigate(['user/eventFront']);
  }







}
