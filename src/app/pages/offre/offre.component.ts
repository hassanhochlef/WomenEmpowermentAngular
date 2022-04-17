import { Component, OnInit } from '@angular/core';
import {OfferService} from '../../shared/offre/Offer.service';
import {Offre} from '../../models/offre';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {
    offre: Offre = new Offre();
    listOffers: Offre[];
  constructor(private apiOffreService: OfferService) { }

  ngOnInit(): void {
      this.apiOffreService.getAllOffers().subscribe(res => {console.log(res);
                                                            this.listOffers = res ; });
  }
  /*addOfree(){
    this.apiOffreService.createOffre(this.offre, 11).subscribe(
        data => {
          console.log( 'offre added successfully ' );

        },
        err => {
          console.error(err);
        }
    );
   }*/
}
