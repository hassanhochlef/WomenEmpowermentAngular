import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Product} from '../../demo/domain/product';
import {ProductService} from '../../demo/service/productservice';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import {AuthenticationService} from '../../shared/authentication.service';
import {UserService} from '../../shared/user.service';
import {Customer, Representative} from '../../demo/domain/customer';
import {Table} from 'primeng/table';
import {CustomerService} from '../../demo/service/customerservice';
import {User} from '../../models/user.model';
import {Country} from '../../models/country.enum';
import {Router} from '@angular/router';
import {Event} from '../../models/event.model';
import {Donation} from '../../models/donation.model';
import {Post} from '../../models/post.model';
import {PostComment} from '../../models/postComment.model';

@Component({
  selector: 'app-admin-dashboard-backoffice',
  templateUrl: './admin-dashboard-backoffice.component.html',
  styleUrls: ['./admin-dashboard-backoffice.component.scss'],
})
export class AdminDashboardBackofficeComponent implements OnInit {

  subscribedUsers: Array<User> = [];

  allPosts: Array<Post> = [];

  allComments: Array<PostComment> = [];

  allEvents: Array<Event> = [];

  allTransaction: Array<Donation> = [];

  allAdmins: Array<User> = [];

  lineData: any;

  countries = Country;

  allUsers: Array<User> = [];

  countryList: Array<string> = [];

  countryValues: Array<number> = [];

  colors: Array<string> = [];

  allSubscribedUsers: Array<User> = [];

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

  constructor(private productService: ProductService, private breadcrumbService: BreadcrumbService, authenticationService: AuthenticationService,
              private userService: UserService, private customerService: CustomerService, private router: Router) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/']}
    ]);


  }

  ngOnInit() {

    this.userService.getAllSubscribedUser().subscribe( subsribed => {
      this.subscribedUsers = subsribed;
    })

    this.userService.getAllPosts().subscribe( posts => {
      this.allPosts = posts;
    });

    this.userService.getAllComments().subscribe( comments => {
      this.allComments = comments;
    });

    this.userService.getAllEvents().subscribe( events => {
      this.allEvents = events;
      console.log(this.allEvents);
    });

    this.userService.getAllTransaction().subscribe( transactions => {
      this.allTransaction = transactions;
      console.log(this.allTransaction);
    });

    this.userService.getAllAdmins().subscribe( allAdmins => {
      this.allAdmins = allAdmins;
    });

    this.userService.getCountryList().subscribe(countryList => {
      this.countryList = countryList;
      this.userService.getCountriesValues().subscribe(countryValues => {
        this.countryValues = countryValues;

        // Generating random color depending on countries number
        let letters = '0123456789ABCDEF';
        for (let j = 0; j < this.countryList.length; j++){
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          this.colors.push(color);
        }
///////////////////////////////////////////////
        this.revenueChart = {
          labels: this.countryList,
          datasets: [{
            data: this.countryValues,
            backgroundColor: this.colors
          }]
        };

      });
    });




    // Linear Chart Dynamic Data Init
    this.userService.getUsersByMonth('0').subscribe( january => {
      this.userService.getUsersByMonth('1').subscribe( february => {
        this.userService.getUsersByMonth('2').subscribe( march => {
          this.userService.getUsersByMonth('3').subscribe( april => {
            this.userService.getUsersByMonth('4').subscribe( may => {
              this.userService.getUsersByMonth('5').subscribe( june => {
                this.userService.getUsersByMonth('6').subscribe( july => {
                  this.userService.getUsersByMonth('7').subscribe( august => {
                    this.userService.getUsersByMonth('8').subscribe( september => {
                      this.userService.getUsersByMonth('9').subscribe( october => {
                        this.userService.getUsersByMonth('10').subscribe( november => {
                          this.userService.getUsersByMonth('11').subscribe( december => {

                            this.userService.getSubscribedUsersByMonth('0').subscribe(jan => {
                              this.userService.getSubscribedUsersByMonth('1').subscribe(feb => {
                                this.userService.getSubscribedUsersByMonth('2').subscribe(mar => {
                                  this.userService.getSubscribedUsersByMonth('3').subscribe(apr => {
                                    this.userService.getSubscribedUsersByMonth('4').subscribe(mai => {
                                      this.userService.getSubscribedUsersByMonth('5').subscribe(jun => {
                                        this.userService.getSubscribedUsersByMonth('6').subscribe(jul => {
                                          this.userService.getSubscribedUsersByMonth('7').subscribe(aug => {
                                            this.userService.getSubscribedUsersByMonth('8').subscribe(sept => {
                                              this.userService.getSubscribedUsersByMonth('9').subscribe(oct => {
                                                this.userService.getSubscribedUsersByMonth('10').subscribe(nov => {
                                                  this.userService.getSubscribedUsersByMonth('11').subscribe(dec => {

                                                    this.lineData = {
                                                      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                                      datasets: [
                                                        {
                                                          label: 'Register Users',
                                                          data: [january.length, february.length, march.length, april.length, may.length, june.length, july.length,
                                                            august.length, september.length, october.length, november.length, december.length],
                                                          fill: false,
                                                          backgroundColor: 'rgb(255, 205, 86)',
                                                          borderColor: 'rgb(255, 205, 86)'
                                                        },
                                                        {
                                                          label: 'Subscribed Users',
                                                          data: [jan.length, feb.length, mar.length, apr.length, mai.length, jun.length, jul.length,
                                                            aug.length, sept.length, oct.length, nov.length, dec.length],
                                                          fill: false,
                                                          backgroundColor: 'rgb(75, 192, 192)',
                                                          borderColor: 'rgb(75, 192, 192)'
                                                        }
                                                      ]
                                                    };


                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });



                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });


    this.userService.getAllUser().subscribe(users => {
      this.allUsers = users;
    });


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

  unlockUser(username: string){
    this.userService.unlockUser(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  lockUser(username: string){
    this.userService.lockUser(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  makeAdmin(username: string){
    this.userService.makeAdmin(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


}
