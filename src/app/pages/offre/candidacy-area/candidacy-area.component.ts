import {Component, OnInit, ViewChild} from '@angular/core';
import {Candidacy} from '../../../models/Candidacy.model';
import {OfferService} from '../../../shared/offre/Offer.service';
import {Offre} from '../../../models/offre';
import {Interview} from '../../../models/Interview.model';
import {User} from '../../../models/user.model';
import {MenuItem, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Product} from '../../../demo/domain/product';
import {Customer, Representative} from '../../../demo/domain/customer';
import {ProductService} from '../../../demo/service/productservice';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import {AuthenticationService} from '../../../shared/authentication.service';
import {UserService} from '../../../shared/user.service';
import {CustomerService} from '../../../demo/service/customerservice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidacy-area',
  templateUrl: './candidacy-area.component.html',
  styleUrls: ['./candidacy-area.component.scss']
})
export class CandidacyAreaComponent implements OnInit {

  countries = Location;

  allCandidacy: Array<Candidacy> = [];

  allOffers: Array<Offre> = [];

  customers1: Customer[];

  customers2: Customer[];

  customers3: Customer[];

  selectedCustomers1: Customer[];

  selectedCustomer: Customer;

  representatives: Representative[];

  statuses: any[];

  products: Product[];

  rowGroupMetadata: any;

  activityValues: number[] = [0, 100];

  @ViewChild('dt') table: Table;

  cols: any[];

  items: MenuItem[];

  ordersChart: any;

  selectedOrderWeek: any;

  productsThisWeek: Product[];

  productsLastWeek: Product[];

  revenueChart: any;

  constructor( private apiOffreService: OfferService , private offerservice: OfferService , private productService: ProductService, private breadcrumbService: BreadcrumbService, authenticationService: AuthenticationService,
               private userService: UserService, private customerService: CustomerService, private router: Router ) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/']}
    ]);


  }

  ngOnInit() {

    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];

    this.items = [{
      label: 'Shipments',
      items: [
        { label: 'Tracker', icon: 'pi pi-compass' },
        { label: 'Map', icon: 'pi pi-map-marker' },
        { label: 'Manage', icon: 'pi pi-pencil' }
      ]
    }
    ];

    this.offerservice.getAllCandidacy().subscribe(candidacys => {
      this.allCandidacy = candidacys;
      this.offerservice.getAllOffers().subscribe(Offers => {
        this.allOffers = Offers;
        this.revenueChart = {
          labels: ['Candidacy', 'offres'],
          datasets: [{
            data: [this.allCandidacy.length, this.allOffers.length],
            backgroundColor: ['#64B5F6', '#7986CB']
          }]
        };
      });
    });





    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
    this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
    this.customerService.getCustomersMedium().then(customers => this.customers3 = customers);

    this.representatives = [
      {name: 'Amy Elsner', image: 'amyelsner.png'},
      {name: 'Anna Fali', image: 'annafali.png'},
      {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
      {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
      {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
      {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
      {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
      {name: 'Onyama Limba', image: 'onyamalimba.png'},
      {name: 'Stephen Shaw', image: 'stephenshaw.png'},
      {name: 'XuXue Feng', image: 'xuxuefeng.png'}
    ];

    this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'},
      {label: 'New', value: 'new'},
      {label: 'Negotiation', value: 'negotiation'},
      {label: 'Renewal', value: 'renewal'},
      {label: 'Proposal', value: 'proposal'}
    ];





  }
  /*
  showInfoViaToast() {
    this.service.add({key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
  }

  showWarnViaToast() {
    this.service.add({key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
  }

  showErrorViaToast() {
    this.apiOffreService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
  }

  showSuccessViaToast() {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
  }
  */
  holdCandidacy(id: number): void {
    // tslint:disable-next-line:max-line-length
    this.apiOffreService.HoldCandidacy(id).subscribe(() => this.router.navigateByUrl('/admin/pages/candidacyarea'));
  }
  restrainCandidacy(id: number): void {
    // tslint:disable-next-line:max-line-length
    this.apiOffreService.restrainCandidacy(id).subscribe(() => this.apiOffreService.getAllCandidacy().subscribe(res => {console.log(res); this.allCandidacy = res ; }));
    this.router.navigate(['/admin/pages/candidacyarea']);
  }

  recentSales(event) {
    if (event.value.code === '0') {
      this.products = this.productsThisWeek;
    } else {
      this.products = this.productsLastWeek;
    }
  }

  shuffle() {
    for (let i = this.products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.products[i], this.products[j]] = [this.products[j], this.products[i]];
    }
    return this.products;
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.customers3) {
      for (let i = 0; i < this.customers3.length; i++) {
        const rowData = this.customers3[i];
        const representativeName = rowData.representative.name;

        if (i === 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        }
        else {
          const previousRowData = this.customers3[i - 1];
          const previousRowGroup = previousRowData.representative.name;
          if (representativeName === previousRowGroup) {
            this.rowGroupMetadata[representativeName].size++;
          }
          else {
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
          }
        }
      }
    }
  }
/*
  unlockUser(username: string){
    this.userService.unlockUser(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }*/
/*
  lockUser(username: string){
    this.userService.lockUser(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }*/
}
