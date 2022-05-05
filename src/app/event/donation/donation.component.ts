import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Customer} from '../../demo/domain/customer';
import {CustomerService} from '../../demo/service/customerservice';
import {Donation} from "../../models/donation.model";
import {DonationService} from "../../shared/donation.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],

})
export class DonationComponent implements OnInit {






  constructor() { }

  ngOnInit() {


  }


}

