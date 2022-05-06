import {Component, OnInit} from '@angular/core';
import {Product} from '../demo/domain/product';
import {ProductService} from '../demo/service/productservice';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Event} from '../models/event.model';
import {EventService} from '../shared/event.service';
import { Router } from '@angular/router';
import {User} from "../models/user.model";
import { Donation } from '../models/donation.model';
import { DonationService } from '../shared/donation.service';
import {PostComment} from "../models/postComment.model";
import {EventcommentModel} from "../models/eventcomment.model";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }

        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
  providers: [MessageService, ConfirmationService]
})
export class EventComponent implements OnInit {

  filteredString: string = '';
  eventDialog: boolean;
  events: Event[];
  eventsStat: any[];
  event: Event;
  barData: any;
  selectedEvent: Event[];
  submitted: boolean;
  dispalyChart = false;
  eventCom: EventcommentModel[];

d: Donation;
//donation bloc
  donations: Donation[];
  dialogVisible: boolean;

  scrollableCols: any[];

  unlockedCustomers: any[];

  lockedCustomers: any[];

  balanceFrozen: boolean = false;

  rowGroupMetadata: any;
//fin


  cols: any[];

  constructor(private eventService: EventService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private router: Router, private donationservice: DonationService ) {
  }

  ngOnInit() {
    this.getcommentEvent();
    this.getDonation();
    this.getEvent();
    this.eventService.getStatistic().subscribe(data => {
      this.eventsStat = data;
      this.barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','aout','sept','oct','nov'],
        datasets: [
          {
            label: 'EVENMENT 2022 FREQUENCE',
            data: this.eventsStat as number[],
            fill: false,
            backgroundColor: 'rgb(255, 205, 86)',
            borderColor: 'rgb(255, 205, 86)'
          }
        ]
      };
      this.dispalyChart = true;
    });


  }

  private getStat(){

  }

  //affichage donation
  private getDonation(){
    this.donationservice.getDonationList().subscribe(eventsRslt => {
      this.donations = eventsRslt;
      console.log(this.donations);
    });
  }

// affichage event
  private getEvent() {
    this.eventService.getListBackallEvent().subscribe(eventsRslt => {
      this.events = eventsRslt;
      console.log(this.events);
    });

  }
  private getcommentEvent() {
    this.eventService.getListCommentEvent().subscribe(commentRslt => {
      this.eventCom = commentRslt;
      console.log(this.eventCom);
    });
  }

  openNew() {
    this.event = {};
    this.submitted = false;
    this.eventDialog = true;
  }

  /*eventsave() {
    this.eventService
        .createEvent(this.event).subscribe(data => {
          console.log(data);
          this.gotoList();
        },
        error => console.log(error));
  }*/
  gotoList() {
    this.router.navigate(['/pages/event']);
  }
  hideDialog() {
    this.eventDialog = false;
    this.submitted = false;
  }

/*  removeEvent(id: number) {
    this.eventService.deletEvent(id)
        .subscribe(
            data => {
              console.log(data);
              },
            error => console.log(error));
  }*/
  deleteProduct(eventId: number) {

        this.eventService.deletEvent(eventId)
            .subscribe(
                data => {
                  console.log(data);
                },
                error => console.log(error));
        this.events = this.events.filter(val => val.eventId !== eventId);

  }



/*
  addnewpost() {
    this.cs.addPost(this.post).subscribe(data => {
          this.router.navigate(['/user/forum']).then(() => {
            window.location.reload();
          });
        },
        err => {
          if (err?.status === 424) {
            this.errorMessage = 'Bad Word used';
          } else if (err?.status === 400) {
            this.errorMessage = 'Email already exists';
          }
        }
    );
  }

*/

}

