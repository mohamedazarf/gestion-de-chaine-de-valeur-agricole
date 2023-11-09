import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AmdminServiceService } from 'src/app/services/admin-service.service';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})
export class ListOfUsersComponent implements OnInit {
  http!: HttpClient; start = 0; selectedLength = 5; 
  lengths = [5, 10, 15, 20];
  currentPage: number = 1;
  numberOfPages!: number;
  public section: string = '';
connectedUserToken:any;
  filtrage:boolean;
  validationMessage:boolean=false; errorMessage:boolean=false;   showUpdateUserForm:boolean=true;

  userType: string | null;
  userRole: string | null;

  userType2: string | null;
  userRole2: string | null; private subscription: Subscription;
  userId: string | null;
  userPublicKey: string | null;
  constructor(private adminService: AmdminServiceService, private route: ActivatedRoute, private authenticationService: AuthenticationServiceService) {
    //diviser slide of functionalities entre les taches de l'administrateur et les fonctionnalités possible pour un utilisateur
    this.userType = this.route.snapshot.queryParamMap.get('userType');
    this.userRole = this.route.snapshot.queryParamMap.get('userRole');
 
    this.subscription = this.authenticationService.userRole$.subscribe(role => {
      this.userRole2 = role; console.log("mil 22222 userRole==="+this.userRole2)
      // Perform any necessary logic based on the user role
    });
  
    this.subscription = this.authenticationService.userType$.subscribe(type => {
      this.userType2 = type; console.log("mil 22222 userType==="+this.userType2)
      // Perform any necessary logic based on the user type
    });
    this.subscription = this.authenticationService.userId$.subscribe(id => {
      this.userId = id; console.log("mil 22222 id==="+this.userId)
      // Perform any necessary logic based on the user role
    });
    this.subscription = this.authenticationService.userPublicKeySubject$.subscribe(pubKey => {
      this.userPublicKey = pubKey; console.log("mil 22222 PUBLIC_KEY==="+this.userPublicKey)
      // Perform any necessary logic based on the user type
    });
  }
  public conditionn:string='transformateur';
  public users: User[] = [];
  public originalTable!: User[];
// public conditionn:string='agricole';
ngOnInit() {
  // this.loadData()
  this.connectedUserToken=this.getCookieValue('loggedUser'); 
  console.log("connected user Token ===="+this.connectedUserToken)
  this.getTransactionAccountHistory(); 
  this.filterOffersById(this.userId);
  this.getUsers2();
  this.getAllOffers();
  this.filterUsers();
  this.consulterHistoriqueUtilisateur();
  console.log("role---->"+this.userRole2);
  console.log("type---->"+this.userType2);

  if(this.userRole === 'exportateur' || this.userType2 === 'exportateur'){
    this.adminService.filterOffers2('transformateur')
    .subscribe(response => {
      this.filteredOffersByActor=response.data;
      console.log("filtred offers by actor   "+this.filteredOffersByActor)
      this.loadUserNamesAndPhoneNumbers();
      return response.data;
    }, error => {
      // Handle any errors here
      console.error(error);
    });
    
  }
  if(this.userRole === 'transformateur' || this.userType2=== 'transformateur'){
    // this.adminService.filterOffers2('agricole');
    this.adminService.filterOffers2('agricole')
    .subscribe(response => {
      this.filteredOffersByActor=response.data;
      this.loadUserNamesAndPhoneNumbers();
      return response.data;
    }, error => {
      // Handle any errors here
      console.error(error);
    });
    this.filterOffers2('transformateur');
  }

  if(this.userRole === 'admin' || this.userType2 === 'admin'){
    this.adminService.getAllReclamations().subscribe(
      response => {
        this.reclammmations=response.data;
        this.loadUserNamesByReclammation();
      },
      error => {
        console.log("fama mochkel fil reclammmations")
        console.error('Error sending message:', error);
        // Handle the error if needed
      });
  }
  console.log("my offers offre "+this.filtrerOffres())
  this.filtrerOffresById("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkZDVmZTg0ZTEzMWQzOGIyMzU2Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoidHJhbnNmb3JtYXRldXIiLCJwdWJsaWNfa2V5IjoiMHhFOTM5M0M3YjhFRWRBYjA1RDllOTZkNkRlMzdDRjBDMDY3YzY4NTVkIiwicHJpdmF0ZV9rZXkiOiIweDllZWNkNGYyNGUxMjk0Y2U3ZGQ3MDAyYmQwMzQwNWI4YWYyMWQ5Njk0NGY5MjU5M2VhMGFkMjIyZjBlZGJlMjYiLCJleHAiOjI1MzQwMjIxNDQwMH0.nWF89LUhOC_-6shXgP-9Ue0eejXxr22-fPtLSgyihJs","64778dd5fe84e131d38b2356");
}

   deleteReclamation(id: string) {
    this.adminService.deleteReclamation(id)
      .subscribe(
        (response) => {
          console.log(response)// Suppression réussie, effectuer les actions nécessaires
          this.getAllReclamations();
        },
        (error) => {
          // Gérer l'erreur de suppression
        }
      );
  }
  
usersByRef:User[];
getUsersByRef(ref: any): User {
  this.adminService.temchiBidhnallah3()
    .pipe(
      map((response) => {
        let text = JSON.stringify(response);
        let users = JSON.parse(text); // convert string response to JSON object
        this.users = users.data;

        this.usersByRef = this.users.filter((user) => user._id === ref);
console.log("user actorRef =="+this.usersByRef[0].name)
      }),
      catchError((error) => {
        console.error(error);
        return of(null); // return null or any default value on error
      })
    );
    return this.usersByRef[0];
}

  public getUsers2(){
    this.adminService.temchiBidhnallah3()
    .subscribe(
      (response) => {
        let text = JSON.stringify(response);
        let users = JSON.parse(text); // convert string response to JSON object
       this.users=users.data;

        return users;
      },
      (error) => {
        console.error(error);
      }
    );
  
  }

  filterValue: string = '';
  // filterName:string=""; filterUsername:string=""; filterEmail:string=""; filteredUsers = this.users;
  sortValue: string = '';

  sortTable() {
    if (this.sortValue === 'name') {
      this.users = this.users.slice().sort(
        (a, b) => a.name.localeCompare(b.name)
      );
    }
  }
  sortTableArrows(param: string, order: string) {
    if (order == "asc") {
      if (param === 'name') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        );
      }
      if (param === 'username') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        );
      }
      if (param === 'email') {
        this.users = this.users.slice().sort(
          (a, b) => a.email.localeCompare(b.name)
        );
      }
    }
    if (order == "des") {
      if (param === 'name') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        ).reverse();
      }
      if (param === 'username') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        ).reverse();
      }
      if (param === 'email') {
        this.users = this.users.slice().sort(
          (a, b) => a.email.localeCompare(b.name)
        ).reverse();
      }
    }
  }
  filtredUsers: User[] = []; filtredOffers:Offer[]; 
  filtredUsersByType: User[] = [];
  applyFilter() {
    if (this.filterValue.length > 0) {

      this.filtredUsers = this.approvedUsers.filter(user =>
        user.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
      this.filtredOffers = this.offers.filter(offer =>
        offer.quality.toString() === this.filterValue 
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // offer.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
      this.filtredUsersByType=this.usersByType.filter(user =>
        user.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }

  }
  applyFilterUsersDashbord(){
    if (this.filterValue.length > 0) {
console.log(this.offers)
      this.filtredOffers = this.offers.filter(offer =>
        offer.quality.toString() === this.filterValue 
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // offer.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
      console.log(this.filtredOffers)
    }
  }

  resetTable() {
    console.log(this.originalTable);
    // this.users = this.getUsers();
    // this.filterName = '';
    // this.filterUsername = '';
    // this.filterEmail = '';
    this.filterValue = '';
    this.sortValue = '';
  }
  updateCurrentPage(direction: string) {
    if (direction == "next") {
      this.currentPage += 1;
      console.log("page +1")
    }
    if (direction == "back") {
      this.currentPage -= 1;
      console.log("page -1")
    }
  }
getPaginatedData2(table:any[],selectedLength:number){
  
  const startIndex = (this.currentPage - 1) * this.selectedLength;
 
  this.numberOfPages = Math.ceil(table.length / this.selectedLength);
 
  return table.slice(startIndex, Number(startIndex) + Number(this.selectedLength));
}
  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.selectedLength;
    this.numberOfPages = Math.ceil(this.approvedUsers.length / this.selectedLength);
    // return this.users.slice(startIndex, Number(startIndex) + Number(this.selectedLength));
    return this.approvedUsers.slice(startIndex, Number(startIndex) + Number(this.selectedLength));
  }
  getPaginatedOffers(){
    const startIndex = (this.currentPage - 1) * this.selectedLength;
    this.numberOfPages = Math.ceil(this.approvedUsers.length / this.selectedLength);
    return this.filtredOffersByActor.slice(startIndex, Number(startIndex) + Number(this.selectedLength));    
  }
  getPaginatedWaitingUsers(){
    const startIndex = (this.currentPage - 1) * this.selectedLength;
    this.numberOfPages = Math.ceil(this.approvedUsers.length / this.selectedLength);
    return this.waitingUsers.slice(startIndex, Number(startIndex) + Number(this.selectedLength));
  }

  /** Inscription */
  showSectionInscription: boolean = false;
  /**Gestion Utilisateur */
  showSectionGestionUtilisateur: boolean = true;
 
  /**Gestion Stock */
  showSectionFarmerStock: boolean = false;
  showSectionTransformateurStock: boolean = false;
  showSectionExportateurStock: boolean = false;
  /** Vioalation*/
  showReclamationSection: boolean = false;
  /** historique */
  showhistoriqueAgricolteur: boolean = true;
  showhistoriqueTransformateur: boolean = true;
  showhistoriqueExportateur: boolean = true;
  /** Consuleter */
  showTransformateurs: boolean = false;
  showExportateurs: boolean = false;
  /** Offre */
  showOffreAgricoleur: boolean = false;
  showOffreTransformateur: boolean = false;
showListeReclammmations:boolean=false;

  toggleSection(sectionId: string, event: MouseEvent) {
    event.preventDefault();
    if (sectionId === 'utilisateur') {
      this.showSectionInscription = false;
      this.showSectionGestionUtilisateur = true;
      this.showListeReclammmations=false;
    }
    if (sectionId === 'Inscription') {
      this.showListeReclammmations=false;
      this.showSectionGestionUtilisateur = false;
      this.showSectionInscription = true;

    }
    if (sectionId === 'listeReclammmations') {
      this.showSectionInscription = false;
      this.showSectionGestionUtilisateur =false;
      this.showListeReclammmations=true;
    }
    if (sectionId === 'reclamation') {

      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = true;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      this.filtrage=false;

    }
    if (sectionId === 'historique') {
      /* Show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* Stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      this.filtrage=true;

    
      if (this.userType2 === 'agricole') {
        this.showhistoriqueAgricolteur = true;
        this.showhistoriqueTransformateur = false;
        this.showhistoriqueExportateur = false;
       
        console.log("filtrage yemchi ?"+this.filtrage)
      }
      if (this.userRole === 'transformateur') {
        this.showhistoriqueAgricolteur = false;
        this.showhistoriqueTransformateur = true;
        this.showhistoriqueExportateur = false;
    
      }
      if (this.userRole === 'exportateur') {
        this.showhistoriqueAgricolteur = false;
        this.showhistoriqueTransformateur = false;
        this.showhistoriqueExportateur = true;


      }
    }
    if (sectionId === 'transformateurs') {
      /* Show utilisateur */
      this.showTransformateurs = true;
      this.showExportateurs = false;
    
      /* Stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      this.filtrage=true;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      
    }
    if (sectionId === 'exportateurs') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = true;
     this.filtrage=true;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
    
      /* Reclamation */
      this.showReclamationSection = false;
      
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      
    }
    if (sectionId === 'offretransformateur') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = true;

      this.filtrage=true;
    }
    if (sectionId === 'offreAgricolteur') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = true;
      this.showOffreTransformateur = false; 
      this.filtrage=true;
    }
    if (sectionId === 'Stock') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = true;
      this.filtrage=false;
      if (this.userType2 === 'agricole') {
        this.showSectionFarmerStock = true;
        this.showSectionTransformateurStock = false;
        this.showSectionExportateurStock = false;
        console.log(this.showSectionFarmerStock +" showSectionFarmerStock");
        console.log(this.showSectionTransformateurStock+" showSectionTransformateurStock" );
        console.log(this.showSectionExportateurStock+ " showSectionExportateurStock"); 
        
      }
      if (this.userRole === 'transformateur') {
        this.showSectionFarmerStock = false;
        this.showSectionTransformateurStock = true;
        this.showSectionExportateurStock = false;
      }
      if (this.userType2 === 'exportateur') {
        this.showSectionFarmerStock = false;
        this.showSectionTransformateurStock = false;
        this.showSectionExportateurStock = true;
      }

    }
    // console.log(this.showSection);
  }
  //todo fazet ki tenzel 3al bouton yo5rjo informations
  selectedUser: any; selectedOffer: any;
  showModalFlag = false; operation: string | undefined;
  showAboutUser = false;   deleteOfferBoolean:boolean| undefined;
  showModal(user: any, operation: string) {
    this.selectedUser = user;
    this.showModalFlag = true;
    if (operation === 'edit') {
      this.operation = "edit";
    }
    if (operation === 'delete') {
      this.operation = "delete";
    }
    if (operation === 'stats') {
      this.operation = "stats";
    }
    if (operation === 'moreDetails') {
      this.operation = "moreDetails";
    }
    if (operation === 'accepter') {
      this.operation = "accepter";
    }
    if (operation === 'refuser') {
      this.operation = "refuser";
    }
    console.log("operartion update user "+this.operation);
  }
 
  updateStockMode: boolean = false;
  showUpdateStock(mode:string) {
    if(mode === 'effacer'){
      this.deleteOfferBoolean=true;
    }
    if(mode === 'modifier'){
      this.deleteOfferBoolean=false;
    }
    this.showModalFlag = true;
    this.updateStockMode = true;
  }

  hideModal() {
    if (this.selectedUser) {
      this.selectedUser = null;
    }
    this.showModalFlag = false;
   
  }

  quantity: number; quality: string; price: number;

  stock = [
    { quality: 'High', quantity: 1000, price: 5.00 },
    { quality: 'Medium', quantity: 500, price: 3.00 },
    { quality: 'Low', quantity: 200, price: 1.50 }
  ];
  updatedQuantity:string; 
  @ViewChild('UpdateStockForm', { static: false }) UpdateStockForm: NgForm;
  productQuantity: number;
  productQuality: string;
  productPrice: number;
  productUnit: number;
  actorType: string;
  state: string;
  updateStock(offerId: string) {
    console.log("id to upd"+offerId)
    const formValues = {
      quantity: this.productQuantity,
      // quality:this.productQuality,
      // priceUnit:this.productPrice,
      // state:this.state,
      // unit:this.productUnit,
    };   console.log("form update offer+"+formValues.quantity);

    this.adminService.updateOffer(offerId, formValues)
      .subscribe(
        response => {
console.log('Update request successful', response);
this.getAllOffers();
this.filterOffers2('transformateur')
this.filtrerOffresById(this.connectedUserToken,this.userId);
this.showModalFlag=false;
this.validationMessage=true;
setTimeout(()=>{
  this.validationMessage=false;
},1000)
this.updateStockMode=false;
        },
        error => {
          console.error('Update request error', error);
          this.showModalFlag=false;
          this.errorMessage=true;
          setTimeout(()=>{
            this.errorMessage=false;
          },1000)
          // Handle error scenarios if needed
        }
      );
    console.log('Quantity:', this.UpdatestockForm.value['product-quantity']);
    console.log('Quality:', this.UpdatestockForm.value['product-quality']);
    console.log('Price:', this.UpdatestockForm.value['product-price']);
    console.log('Unit:', this.UpdatestockForm.value['product-unit']);
    console.log('Actor Type:', this.UpdatestockForm.value['actor-type']);
  }
  // updateOfferQuantity(offerId:string){
  //   const url = `http://localhost:5000/api/user/offers/${offerId}`;
  //   const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc';
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // console.log("id off"+offerId)
  //   const payload = { "quantity": this.productQuantity};
  
  //   this.http.put(url, payload, { headers }).subscribe(
  //     (response) => {
  //       console.log('Update offer quantity successful', response);
  //       // Handle success scenario if needed
  //     },
  //     (error) => {
  //       console.error('Update offer quantity error', error);
  //       // Handle error scenario if needed
  //     }
  //   );
  // }
  

  role: string;
  affecterRole(role: string) {
    this.role = role;
  }

  @ViewChild('UpdatestockForm', { static: false }) UpdatestockForm: NgForm;
  showUpdateStockValues() {
    console.log('Quantity:', this.UpdatestockForm.value['product-quantity']);
    console.log('Quality:', this.UpdatestockForm.value['product-quality']);
    console.log('Price:', this.UpdatestockForm.value['product-price']);
    console.log('Unit:', this.UpdatestockForm.value['product-unit']);
    console.log('Actor Type:', this.UpdatestockForm.value['actor-type']);

  }






  // ajouterUtilisateur() {
  //   this.adminService.ajouterUtilisateur();
  // }

  Farmers = this.adminService.getAllFarmers();

  public agricols: agricole[] = [];

  getAgricoles(): void {
    this.adminService.getAgricoles().subscribe(
      (response) => {
        console.log("hay mchet getAgricoles");
        console.log(response);
        this.agricols = response.agricoles;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  deleteAgricole(id: string) {
    this.adminService.deleteAgricole(id);
  }
  deleteUser(id: string) {
    console.log("id = " + id);
    this.adminService.deleteUser(id);
  }


  deleteUser2(id: string): void {
    const url = `http://localhost:5000/api/admin/users/${id}`;
console.log("id to delete----->"+id);
    this.adminService.deleteUser2(id).subscribe(
      (response) => {
        console.log('User deleted successfully');
        this.getUsers2();
        this.filterUsers();
      },
      (error) => {
        console.error(error);
        this.errorMessage=true;
        this.showModalFlag =false;
        setTimeout(()=>{
          this.errorMessage=false;
        },1000)
      }
    );
  }

  updatedName: string; updatedCin: string; updatedEmail: string;
  updatedPhone: string; updatedRole: string; updatedType: string; updatedState: string;
  updateUserValues() {
    console.log("this is update function");
    console.log(this.updatedName);
    console.log(this.updatedCin);
    console.log(this.updatedPhone);
    console.log(this.updatedRole);
    console.log(this.updatedEmail);
    console.log(this.updatedType);
  }

  updateUserMode:boolean;
  updateUser(userId: string) {

    const payload = {
      cin: this.updatedCin,
      name: this.updatedName,
      email: this.updatedEmail,
      phone: this.updatedPhone,
      role: this.updatedRole,
      type: this.updatedType,
    };
    this.adminService.updateUser(userId, payload)
      .subscribe(
        response => {

          console.log('Update request successful', response);
          this.validationMessage=true;
          this.showUpdateUserForm=false;
          this.showModalFlag=false;
          this.getUsers2();
          this.getPaginatedData();
          this.filterUsers();
          setTimeout(() => {
            this.validationMessage=false;
          }, 2000);
          
          // Perform further actions if needed
        },
        error => {
          console.error('Update request error', error);
          this.errorMessage=true;
          setTimeout(()=>{
            this.errorMessage=true;
            setTimeout(()=>{
              this.errorMessage=false
            })
          },2000)
          // Handle error scenarios if needed
        }
        
      );
      
  }


  accepterUser(userId:any){
    const updateData={
      "state":"approved"
    }
    this.adminService.updateUser(userId, updateData).subscribe(
      (response) => {
        console.log('User updated');
        this.filterUsers();
        this.validationMessage=true;
        setTimeout(()=>{
          this.validationMessage=false;
        },1000)
      },
      (error) => {
        console.error('An error occurred', error);
      }
    );
  }
  



  offers: Offer[];  usersHavingOffers:User;
  getAllOffers() {
    this.adminService.getAllOffers().subscribe(
      (response) => {
        this.offers=response.data;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteOffer(id:string){
   console.log("id=="+id)
    this.adminService.deleteOffer(id).subscribe(
    (Response) =>{
      console.log("tfas5et yé rojla");
      this.getAllOffers();
      this.validationMessage=true;
      this.showModalFlag =false;
      setTimeout(()=>{
        this.validationMessage=false;
      },1000)
    },
    (error) => {
      console.log(error);
      this.updateStockMode=false;
      this.errorMessage=true;
      this.showModalFlag =false;
      setTimeout(()=>{
        this.errorMessage=false;
      },1000)
    }
    )
    this.getAllOffers()
  }
  @ViewChild('stockForm', { static: false }) stockForm: NgForm;
  ajouterAuStock() {
    console.log('Quantity:', this.stockForm.value['product-quantity']);
    console.log('Quality:', this.stockForm.value['product-quality']);
    console.log('Price:', this.stockForm.value['product-price']);
    console.log('Unit:', this.stockForm.value['product-unit']);
    console.log('state:', this.stockForm.value['product-state']);

    console.log('Actor Type:', this.stockForm.value['actor-type']);
  }

  ajouterOffre(){
    this.adminService.ajouterOffreAgriculteur(this.stockForm,this.connectedUserToken).subscribe(
        (response) => {
          // Handle success response
          this.getAllOffers();
  console.log('Offer added successfully:', response);
          this.validationMessage=true;
setTimeout(()=>{
  this.validationMessage=false;
},1000)
          // Reset the form if needed
        },
        (error) => {
          // Handle error response
          console.error('Error adding offer:', error);
          this.errorMessage=true;
          setTimeout(()=>{
            this.errorMessage=false;
          },1000)
        }
      );
  }



  selectOffer(offer: any) {
    this.selectedOffer = offer;
    console.log("selected Offer quantity"+this.selectedOffer.quantity);
    console.log("selected Offer2"+this.selectedOffer);
  }
  selectUser(id: any) {
    // this.selectedUser = user;
    console.log("id mta3 l user li theb tnahih"+id);
  }

waitingUsers:User[]; approvedUsers:User[];

hasWaitingUsers: boolean = false;
@ViewChild('offers') offersTemplate: TemplateRef<any>;

filterUsers() {
  this.adminService.filterUsers('waiting').subscribe(
    (response) => {
      this.waitingUsers = response.data;
      this.hasWaitingUsers = this.waitingUsers.length > 0;
      // Handle the response data
    },
    (error) => {
      console.error('An error occurred', error);
     
      // Handle the error
    }
  );

  this.adminService.filterUsers('approved').subscribe(
    (response) => {
      this.approvedUsers = response.data;
      // Handle the response data
    },
    (error) => {
      console.error('An error occurred', error);
      // Handle the error
    }
  );
}

  
 
usersByType:User[];
  consulterUserByType(userType:string){
    // let userType="transformateur";
    this.adminService.getUserByType(userType).subscribe(
      (response) => {
        // Handle the response here
        console.log("users filtred by type")
        console.log(response.data);
        this.usersByType=response.data;
        // this.usersByType=response.data;
        // return response;
      },
      (error) => {
        // Handle errors here
        console.log("fama mochkel fil transformateurs")
        console.error(error);
      }
    );
    }
  



    
// todo
//placeholder w bara
   
    


filtredOffersByActor:Offer[];
filterOffers2(condition:string){
if(condition === 'transformateur'){
  this.adminService.filterOffers2('transformateur')
  .subscribe(response => {
    // Handle the response data here
    // console.log("les offres de l'agric "+condition);
    console.log(response);
    this.filtredOffersByActor=response.data;
    console.log("filtred offers by actor   "+this.filtredOffersByActor)
    return response.data;
  }, error => {
    // Handle any errors here
    console.error(error);
  });

}

if(condition === 'agricole'){
  this.adminService.filterOffers2('agricole')
  .subscribe(response => {
    this.filtredOffersByActor=response.data;
    return response.data;
  }, error => {
    // Handle any errors here
    console.error(error);
  });
}
}
MyOffers:Offer[];
filterOffersById(id:any){
  console.log("id mil filterOffersById"+id);
  this.adminService.filterOffersById(this.connectedUserToken,this.userId)
  .subscribe(response => {
    console.log(" mtoken connedté mil filterOffersById"+this.connectedUserToken);
    console.log(response.data);
  this.MyOffers=response.data;
   
    return response.data;
  }, error => {
    // Handle any errors here
    console.log("filtrage mta3 l'offre bil id memchech")
    console.error(error);
  });
}


adminToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyYmEyMzA0ZWE5OWIwMjIyMjdmMTBlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.baubGRFe5w8ukFMOnfNy2Tzfn7A6Xecf3VL5DVYxvmA'
private httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${this.adminToken}`
  })};

userByRole:User;
searchUserById(userId: string) {
  const apiUrl = 'http://localhost:5000/api/admin/filter_users';
  const requestBody = { _id: userId };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.post(apiUrl, requestBody,this.httpOptions).subscribe(
    (response:any) => {
      this.userByRole=response.data[0];
      console.log('User found:', response.data[0].name);
     
      // Handle the response data
    },
    (error) => {
      console.error('An error occurred', error);
      // Handle the error
    }
  );
return this.userByRole
}
message:string;
createViolationReclamation(event: Event,message:any) {
  event.preventDefault();
console.log("reclamation:::"+this.message)
this.adminService.createViolationReclamation(message,this.connectedUserToken).subscribe(
  response => {
    console.log('Message sent successfully:', response);
    this.validationMessage=true;
    setTimeout(()=>{
      this.validationMessage=false;
    },1000)
    // Do something with the response if needed
  },
  error => {
    console.error('Error sending message:', error);
  this.errorMessage=true;
  setTimeout(()=>{
    this.errorMessage=false;
  },1000)
  }
);
        }
reclammmations:reclamation[];
        getAllReclamations() {
          this.adminService.getAllReclamations().subscribe(
          response => {
            this.reclammmations=response.data;
            this.loadUserNamesByReclammation()
          },
          error => {
            console.log("fama mochkel fil reclammmations")
            console.error('Error sending message:', error);
            // Handle the error if needed
          }
        );
                }
                userNamesWithReclammation: { [key: string]: string } = {};
                phoneNumbersWithReclamation: { [key: string]: string } = {};
                loadUserNamesByReclammation() {
                  for (const reclamation of this.reclammmations) {
                    this.adminService.searchUserById(reclamation.userRef).subscribe(
                      response => {
                        const userName = response.data[0].name;
                        this.userNamesWithReclammation[reclamation.userRef] = userName;
                        this.phoneNumbersWithReclamation[reclamation.userRef] = response.data[0].phone;
                      },
                      error => {
                        console.error(error);
                        this.userNamesWithReclammation[reclamation.userRef] = ''; // Assign a default value in case of error
                        this.phoneNumbersWithReclamation[reclamation.userRef] = '';
                      }
                    );
                  }      
                }              
              
filteredOffersByActor: Offer[];
userNames: { [key: string]: string } = {};
phoneNumbers: { [key: string]: string } = {};        
                loadUserNamesAndPhoneNumbers() {
                  for (const offer of this.filteredOffersByActor) {
                    this.adminService.searchUserById(offer.actorRef).subscribe(
                      response => {
                        const userName = response.data[0].name;
                        this.userNames[offer.actorRef] = userName;
                        this.phoneNumbers[offer.actorRef] = response.data[0].phone;
                      },
                      error => {
                        console.error(error);
                        this.userNames[offer.actorRef] = ''; // Assign a default value in case of error
                        this.phoneNumbers[offer.actorRef] = ''; // Assign a default value in case of error
                      }
                    );
                  }      
                }   
                
@ViewChild('updateForm', { static: false }) updateForm: NgForm;

                // Other component code
              
 closeModal(form: NgForm) {
  form.resetForm();
}

historyId:any; historyQlty:any; historyQty:any;
consulterHistoriqueUtilisateur(){
  let pubKey='0x421472051071af95d1425E290D814dFd55d81b14';
  let history;
  this.adminService.consulterHistoriqueUtilisateur(pubKey,this.connectedUserToken).subscribe(
    (response)=>{
console.log(response.data[0].args)
const history=response.data[0].args;
this.historyId=response.data[0].args._prod_id;
this.historyQlty=response.data[0].args._prod_qlt;
this.historyQty=response.data[0].args._prod_qty;
console.log("history="+this.historyId)
    },
    (error)=>{
console.log(error)
    }
  );
  // return history;
}

acheterOffre(id:any){
  console.log("offer id is "+id)
this.adminService.acheterOffre(id,this.connectedUserToken).subscribe(
  (response)=>{
    console.log(response);
    if(this.userRole === 'exportateur' || this.userType2 === 'exportateur'){
      this.adminService.filterOffers2('transformateur')
      .subscribe(response => {
        this.filteredOffersByActor=response.data;
        console.log("filtred offers by actor   "+this.filteredOffersByActor)
        this.loadUserNamesAndPhoneNumbers();
        return response.data;
      }, error => {
        // Handle any errors here
        console.error(error);
      });
      
    }
    if(this.userRole === 'transformateur' || this.userType2=== 'transformateur'){
      // this.adminService.filterOffers2('agricole');
      this.adminService.filterOffers2('agricole')
      .subscribe(response => {
        this.filteredOffersByActor=response.data;
        this.loadUserNamesAndPhoneNumbers();
        return response.data;
      }, error => {
        // Handle any errors here
        console.error(error);
      });
      this.filterOffers2('transformateur');
    }
  },
  (error)=>{
    console.log("theb techri l'offre "+id)
    console.log(error);
  }
);
}

transactionHistory:any;
getTransactionAccountHistory(){
  this.adminService.getTransactionAccountHistory(this.connectedUserToken).subscribe(
    (Response)=>{
      console.log('history of account ::::');
      console.log(Response);
      this.transactionHistory=Response.message;
    
    },
    (Error)=>{
      console.log(Error);     
    }
    );
}

filtrerOffresById(token: any, id: any) {
  const url = 'http://localhost:5000/api/user/offers/filter_offers';
  const body = {
    actorRef: this.userId
  };
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.connectedUserToken}`
  });

  this.http.post(url, body, { headers }).subscribe(
    (response: any) => {
      // Traiter la réponse ici
      console.log(response);
      console.log(response.data);
     
    },
    (error: any) => {
      // Gérer les erreurs ici
      console.error(error);
    }
  );
}


filtrerOffres() {
  const url = 'http://localhost:5000/api/user/offers/filter_offers';
  const body = {
    actorRef: '64778d70fe84e131d38b2354'
  };
  const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkZDVmZTg0ZTEzMWQzOGIyMzU2Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoidHJhbnNmb3JtYXRldXIiLCJwdWJsaWNfa2V5IjoiMHhFOTM5M0M3YjhFRWRBYjA1RDllOTZkNkRlMzdDRjBDMDY3YzY4NTVkIiwicHJpdmF0ZV9rZXkiOiIweDllZWNkNGYyNGUxMjk0Y2U3ZGQ3MDAyYmQwMzQwNWI4YWYyMWQ5Njk0NGY5MjU5M2VhMGFkMjIyZjBlZGJlMjYiLCJleHAiOjI1MzQwMjIxNDQwMH0.nWF89LUhOC_-6shXgP-9Ue0eejXxr22-fPtLSgyihJs');

  this.http.post(url, body, { headers }).subscribe(
    (response) => {
      // Traiter la réponse ici
      console.log("from filtrerOffres")
      console.log(response);
    },
    (error) => {
      // Gérer les erreurs ici
      console.error(error);
    }
  );
}


getCookieValue(name: string): string | null {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}


              }             
                

export interface User {
  _id: string;
  cin: string;
  email: string;
  name: string;
  phone: string;
  role: "admin" | "user";
  type:"agriculteur" | "transformateur" | "exportateur";
  public_key: string;
}





export interface agricole {
  _id: string;
  localisation: string;
}

export interface Offer {
  _id: string;
  quantity: number;
  quality: string;
  priceUnit: number;
  unit: string;
  state: string;
  actorType: string;
  actorRef: string;

}

export interface reclamation{
  _id: string,
  msg: string,
  userRef: string
}




