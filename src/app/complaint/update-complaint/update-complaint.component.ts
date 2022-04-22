import { Component, OnInit } from '@angular/core';
import {Complaint} from '../../models/complaint.model';
import {ComplaintService} from '../../shared/complaint.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-update-complaint',
  templateUrl: './update-complaint.component.html',
  styleUrls: ['./update-complaint.component.scss']
})
export class UpdateComplaintComponent implements OnInit {
  currentComplaint = new Complaint();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private compalintService: ComplaintService ) { }

  ngOnInit(): void {this.compalintService.consulterComp(this.activatedRoute.snapshot.params.id).
  subscribe( comp =>{ this.currentComplaint = comp; });
  }
updateProduit(){
  this.compalintService.updateProduit(this.currentComplaint).subscribe(() => {
        this.router.navigate(['complaint']);
      });
  this.router.navigate(['complaint']).then(() => {
    window.location.reload();
  });
}}
