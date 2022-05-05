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
    post1: Complaint = new Complaint();
    post2: Complaint = new Complaint();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private compalintService: ComplaintService ) { }

  ngOnInit(): void {}/*
    UpdateComp(id: string) {
        if (this.post1.content === ''){this.post1.content = this.post2.content; }
        this.compalintService.UpdateComp(id, this.post1).subscribe(p => {
            console.log(this.post1);
            this.router.navigate(['user/forum']).then(() => {
                window.location.reload();
            });
        });
    }*/
 }
