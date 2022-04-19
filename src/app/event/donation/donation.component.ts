import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Customer} from '../../demo/domain/customer';
import {CustomerService} from '../../demo/service/customerservice';
import {Donation} from "../../models/donation.model";
import {DonationService} from "../../shared/donation.service";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],

})
export class DonationComponent implements OnInit {
  donations: any[];


  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.donationService.getDonationList().subscribe(donation => {
      this.donations = donation;
      console.log(this.donations);
    });

  }
}

