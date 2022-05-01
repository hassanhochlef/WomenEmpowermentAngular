import { Component, OnInit, Input } from '@angular/core';
import {PaymentService} from '../../../shared/payment.service';
import {Router} from '@angular/router';
import { loadStripe, Stripe} from '@stripe/stripe-js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentModel } from '../../../models/payment.model';

@Component({
  selector: 'app-payment-donation',
  templateUrl: './payment-donation.component.html',
  styleUrls: ['./payment-donation.component.scss']
})
export class PaymentDonationComponent implements OnInit {
  private stripe: Stripe;

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
  constructor( private paymentservice: PaymentService,  private router: Router) { }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51KcnSgEt84nrmr0uKGmPJxlTuNBD5RooExgbwmSKDJcO28jO2Q2mfEn8ab0tRj1wLNf3UGbL5lWGIZUJrB6yLzc100JIiw1tvN');

    console.log(this.stripe);
    const elements = this.stripe.elements();
    const card = elements.create('card');
    card.mount('#card');
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
  }

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

}
