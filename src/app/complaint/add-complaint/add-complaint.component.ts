import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {ComplaintService} from '../../shared/complaint.service';
import {Complaint} from '../../models/complaint.model';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent implements OnInit {
newComplaint = new Complaint();
  constructor(private router: Router , private ComplaintService: ComplaintService) { }

  ngOnInit(): void {
  }
  addComplaint(){
    this.ComplaintService.ajouterComplaint(this.newComplaint).subscribe(comp => {
      console.log(comp);

    });
    this.router.navigate(['complaint']).then(() => {
      window.location.reload();
    });

}}
