import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offre} from '../../models/offre';
import {CvInfo} from '../../models/CvInfo.model';
import {AuthenticationService} from '../authentication.service';
import {RequestBaseService} from '../request-base.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends  RequestBaseService{
    // protected baseurl = environment.api_url;
    offersUrl = 'http://localhost:8087/SpringMVC/offer/retrieve-all-Offers';
    // tslint:disable-next-line:variable-name
   /* httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',

        } ), responseType: 'text' as 'json'
    };*/

    constructor(authenticationService: AuthenticationService, http: HttpClient) {
        super(authenticationService, http);

    }
    getAllOffers(): Observable<Offre[]> {
        return this.http.get<Offre[]>(this.offersUrl);
    }

    addOffer(offre: Offre){
        return this.http.post<Offre>('http://localhost:8087/SpringMVC/offer/add-Offer', offre);
    }

    deleteOfferById(id: number){
        return this.http.delete('http://localhost:8087/SpringMVC/offer/delete-offer/' + id);
    }
   updateOfferById( x: Offre){
        return this.http.put('http://localhost:8087/SpringMVC/offer/update-Offer/', x);
    }
    ApplyOffer(id: number, cvInfo: CvInfo){
        return this.http.post<CvInfo>('http://localhost:8087/SpringMVC/Cv/upload/{userId}/{offerId}', +id , {headers: this.getHeaders});

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
