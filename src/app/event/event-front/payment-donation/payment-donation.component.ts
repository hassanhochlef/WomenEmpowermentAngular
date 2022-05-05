import { Component, OnInit, Input } from '@angular/core';
import {PaymentService} from '../../../shared/payment.service';
import {ActivatedRoute, Router} from '@angular/router';
import { loadStripe, Stripe} from '@stripe/stripe-js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentModel } from '../../../models/payment.model';
import {DonationService} from "../../../shared/donation.service";
import {Donation} from "../../../models/donation.model";
import {Event} from "../../../models/event.model";

@Component({
  selector: 'app-payment-donation',
  templateUrl: './payment-donation.component.html',
  styleUrls: ['./payment-donation.component.scss']
})
export class PaymentDonationComponent implements OnInit {
  donation: Donation = new Donation();
  private stripe: Stripe;
  idUser;
  myDate = Date.now();
  /* error: any;

   elements: Elements;
   card: StripeElement;



   elementsOptions: ElementsOptions = {
     locale: 'es'
   };
   public stripeForm = new FormGroup({
     name: new FormControl('', Validators.required)
   });
 */
  constructor(private paymentservice: PaymentService, private route: ActivatedRoute, private router: Router, private donationService: DonationService,
              ) {
  }

  async ngOnInit() {
    this.idUser = this.route.snapshot.params['id'];
    this.stripe = await loadStripe('pk_test_51KcnSgEt84nrmr0uKGmPJxlTuNBD5RooExgbwmSKDJcO28jO2Q2mfEn8ab0tRj1wLNf3UGbL5lWGIZUJrB6yLzc100JIiw1tvN');

    console.log(this.stripe);
    const elements = this.stripe.elements();
    const card = elements.create('card', {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '18px',
          '::placeholder': {
            color: '#CFD7E0'
          }
        }
      }
    });
    card.mount('#card');

    card.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      event.error ? displayError.textContent = event.error.message : displayError.textContent = '';
    });

    const button = document.getElementById('button');
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const ownerInfo = {
        owner: {name: 'codexmaker'},
        amount: this.donation.amountForEvent,
        currency: 'eur'
      };
      try {
        const result = await this.stripe.createSource(card, ownerInfo);
        console.log(result);
        let donation = new Donation();
        donation.amountForEvent = result.source.amount;
        donation.codePayement = result.source.id;
        this.donationService.donationEvent(this.idUser, donation).subscribe(data => console.log('success'));
      } catch (e) {
        console.warn(e.message);
      }
    });
  }
}

    /*  this.stripeService.elements(this.elementsOptions)
        .subscribe(elements => {
          this.elements = elements;
          // Only mount the element the first time
          if (!this.card) {
            this.card = this.elements.create('card', {
              style: {
                base: {
                  iconColor: '#666EE8',
                  color: '#31325F',
                  lineHeight: '40px',
                  fontWeight: 300,
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSize: '18px',
                  '::placeholder': {
                    color: '#CFD7E0'
                  }
                }
              }
            });
            this.card.mount('#card-element');
          }
        });*/


 /* donation() {
    const name = this.stripeForm.get('name').value;
    this.stripeService
        .createToken(this.card, { name })
        .subscribe(result => {
          if (result.token) {
            const paymentIntentDto: PaymentModel = {
              token: result.token.id,
              amount: 122,
              currency: 'eur',
            };
            this.paymentservice.GenererToken(paymentIntentDto).subscribe();
            this.error = undefined;
          } else if (result.error) {
            this.error = result.error.message;
          }
        });
  }
*/


