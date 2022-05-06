import { Component, OnInit } from '@angular/core';
import {Offre} from '../../../models/offre';
import {OfferService} from '../../../shared/offre/Offer.service';
import {Router} from '@angular/router';
import {Candidacy} from '../../../models/Candidacy.model';

@Component({
  selector: 'app-my-candidacy',
  templateUrl: './my-candidacy.component.html',
  styleUrls: ['./my-candidacy.component.css']
})

export class MyCandidacyComponent implements OnInit {
  listCandidacy: Candidacy[];
  listFavoriteCandidacy: Candidacy[];

  constructor(private apiOffreService: OfferService , private router: Router) { }

  ngOnInit(): void {
    this.apiOffreService.getMyCandidacy().subscribe(res => {console.log(res);
                                                            this.listCandidacy = res ; });
    this.apiOffreService.getMyFavoriteCandidacy().subscribe(res => {console.log(res);
                                                                    this.listFavoriteCandidacy = res ; });
  }

  Setfavorite(id: number): void {
    // tslint:disable-next-line:max-line-length
    this.apiOffreService.setFvorite(id).subscribe(() => this.router.navigateByUrl('/user/mycandidacy'));
  }
}
