import { Component, OnInit } from '@angular/core';
import {Offre} from '../../../models/offre';
import {OfferService} from '../../../shared/offre/Offer.service';
import {Router} from '@angular/router';
import * as Url from 'url';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
  offre: Offre = new Offre();
  // tslint:disable-next-line:variable-name
  constructor(private os: OfferService, private _router: Router) { }
  addOffer(){
    this.os.addOffer(this.offre).subscribe(() => this._router.navigateByUrl('/offre'));
            }
  ngOnInit(): void {
  }

}
