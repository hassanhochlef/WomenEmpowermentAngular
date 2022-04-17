import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offre} from '../../models/offre';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
    // protected baseurl = environment.api_url;
    offersUrl = 'http://localhost:8081/SpringMVC/offer/retrieve-all-Offers';
    constructor(private _http: HttpClient) { }
    getAllOffers(): Observable<Offre[]> {
        return this._http.get<Offre[]>(this.offersUrl);
    }



    /**
     * add offre
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param  reportProgress flag to report request and response object
     */
  /*  public createOffre(offre: any, offreID: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        return this.httpClient.request<any>('post', `${this.baseurl}/add-Offer?offerId=${offreID}`,
            {
                observe,
                reportProgress,
                body: offre
            }
        );
    }
*/


}
