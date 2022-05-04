import { Component, OnInit } from '@angular/core';
import {OfferService} from '../../shared/offre/Offer.service';
import {Offre} from '../../models/offre';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
    offre: Offre = new Offre();
    offre2: Offre = new Offre();
    // tslint:disable-next-line:ban-types
    listOffers: Offre[];
  constructor(private apiOffreService: OfferService , private router: Router) { }

  ngOnInit(): void {
      this.apiOffreService.getAllOffers().subscribe(res => {console.log(res);
                                                            this.listOffers = res ; });
  }

    deleteOffer(id: number): void {
        // tslint:disable-next-line:max-line-length
        this.apiOffreService.deleteOfferById(id).subscribe(() => this.apiOffreService.getAllOffers().subscribe(res => {console.log(res); this.listOffers = res ; }));
        this.router.navigate(['/user/offre']);
     }
    addOffer(){
        this.apiOffreService.addOffer(this.offre).subscribe(() => this.router.navigateByUrl('/user/offre'));
    }
    getOfferById(x: Offre){
      this.offre2 = x;
    }
    updateOffer(){
        this.apiOffreService.updateOfferById(this.offre2).subscribe(() => this.router.navigateByUrl('/user/offre'));
    }
    applyOffer(id: number){
   //     this.apiOffreService.ApplyOffer(id).subscribe(() => this.router.navigateByUrl('/user/offre'));
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
