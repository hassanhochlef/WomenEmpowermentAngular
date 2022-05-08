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

  constructor(private apiOffreService: OfferService , private router: Router) { }
  listCandidacy: Candidacy[];
  listFavoriteCandidacy: Candidacy[];
  /*setSaving(element, text){
    element.textContent = text;
    element.disabled = true;
  }*/
  toggle: any;
  btnVal = 'Set Favorite';
  ngOnInit(): void {
    this.apiOffreService.getMyCandidacy().subscribe(res => {console.log(res);
                                                            this.listCandidacy = res ; });
    this.apiOffreService.getMyFavoriteCandidacy().subscribe(res => {console.log(res);
                                                                    this.listFavoriteCandidacy = res ; });
  }

  Setfavorite(id: number): void {
    // tslint:disable-next-line:max-line-length
    this.apiOffreService.setFvorite(id, null).subscribe(() => this.router.navigateByUrl('/mycandidacy'));
  }

  changeText()
  {
    this.btnVal = 'Setted';
  }
}
