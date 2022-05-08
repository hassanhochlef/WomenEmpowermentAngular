import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {ComplaintService} from '../../shared/complaint.service';
import {Complaint} from '../../models/complaint.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent implements OnInit {
newComplaint = new Complaint();
  constructor(private router: Router , private ComplaintService: ComplaintService , http: HttpClient) {
  }

  ngOnInit(): void {
  }
  addComplaint(){
    this.ComplaintService.ajouterComplaint(this.newComplaint).subscribe(comp => {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });

    });


}}
