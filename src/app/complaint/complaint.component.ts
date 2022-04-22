import {Component, OnDestroy, OnInit} from '@angular/core';
import {Complaint} from '../models/complaint.model';
import {Router} from '@angular/router';

import {ComplaintService} from '../shared/complaint.service';
import {Subscription} from 'rxjs';
import {compareNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";


@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
listcomp: Complaint[];
  private routeSub: Subscription;
  constructor(private router: Router, private service: ComplaintService) { }

  ngOnInit(): void {
    this.routeSub = this.service.getComplaints().subscribe(res => {console.log(res); this.listcomp = res; });
  }

  supprimerProduit(comp: Complaint)
  {
    console.log("suppppppppppppppppppppppppppppp supprimé");
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.service.supprimerProduit(comp.complaintId).subscribe(() => {
        console.log("complaint delet");
        this.SuprimerProduitDuTableau(comp);
      });

  }
  SuprimerProduitDuTableau(comp: Complaint ) {
    this.listcomp.forEach((comp, index) => {
      if(comp.complaintId === comp.complaintId) {
        this.listcomp.splice(index, 1);
      }
    });
  }

  /*
  deleteComplaint(complaintId: number){
    this.service.deleteComplaintById(complaintId);
  }*/
}
