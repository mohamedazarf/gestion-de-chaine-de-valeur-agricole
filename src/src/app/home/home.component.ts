import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { Offer, User, agricole } from '../adminPages/list-of-users/list-of-users.component';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { AmdminServiceService } from '../services/admin-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {


  constructor(private adminService:AmdminServiceService, private http:HttpClient){} 
  
    
    slideIndex = 1;

  ngOnInit(){
    // this.consulterHistoriqueUtilisateur();
 this.filtrerOffres()
    console.log("odd"+this.filtrerOffresById('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkNzBmZTg0ZTEzMWQzOGIyMzU0Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoiYWdyaWNvbGUiLCJwdWJsaWNfa2V5IjoiMHg3QTI3NzUzZTMwNWRDMDQ1ZUZGNkRmQTQzZDEwMzFlZjM4ZkIzQ2UyIiwicHJpdmF0ZV9rZXkiOiIweDIwMGMyNDI4YmQwNTlmMWQyNWFhMjAyZDM5YmZmMmE0ODE4NTY1ZTRhOWFhM2E2NzZmOWM3MjkxN2VjMGQzODciLCJleHAiOjI1MzQwMjIxNDQwMH0.8MSmnFysI3EEfmG2eL3lPnNk89dpYAtIcGdmlXTWHYM','64778dd5fe84e131d38b2356'))
    this.filtrerOffresById('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkNzBmZTg0ZTEzMWQzOGIyMzU0Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoiYWdyaWNvbGUiLCJwdWJsaWNfa2V5IjoiMHg3QTI3NzUzZTMwNWRDMDQ1ZUZGNkRmQTQzZDEwMzFlZjM4ZkIzQ2UyIiwicHJpdmF0ZV9rZXkiOiIweDIwMGMyNDI4YmQwNTlmMWQyNWFhMjAyZDM5YmZmMmE0ODE4NTY1ZTRhOWFhM2E2NzZmOWM3MjkxN2VjMGQzODciLCJleHAiOjI1MzQwMjIxNDQwMH0.8MSmnFysI3EEfmG2eL3lPnNk89dpYAtIcGdmlXTWHYM','64778dd5fe84e131d38b2356');
    console.log("offre "+this.MyOffers)
  }

     
    
  
    plusSlides(n: number) {
      this.showSlides(this.slideIndex += n);
    }
  
    currentSlide(n: number) {
      this.showSlides(this.slideIndex = n);
    }
  
    showSlides(n: number) {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].setAttribute("style", "display: none");
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].setAttribute("style", "display: block");
      dots[this.slideIndex - 1].className += " active";
    }
  



  








    
   


    showSectionHome: boolean = true;
    showSectionStarted: boolean =false;
    
    toggleSectionHome() {
      this.showSectionHome = true;
      this.showSectionStarted =false;
    }  
    showApropos() {
      this.showSectionHome = false;
      this.showSectionStarted = true;
    }

// consulterHistoriqueUtilisateur(){
//   let pubKey='0x421472051071af95d1425E290D814dFd55d81b14';
//   this.adminService.consulterHistoriqueUtilisateur(pubKey).subscribe(
//     (response)=>{
// console.log(response.data[0].args["_prod_id"])
//     },
//     (error)=>{
// console.log(error)
//     }
//   );
// }



MyOffers:Offer[];
filtrerOffresById(token: any, id: any) {
  const url = 'http://localhost:5000/api/user/offers/filter_offers';
  const body = {
    actorRef: id
  };
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.http.post(url, body, { headers }).subscribe(
    (response: any) => {
      // Traiter la réponse ici
   console.log("from filtrerOffresById")
      console.log(response.data);
      this.MyOffers = response.data;
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
  const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkNzBmZTg0ZTEzMWQzOGIyMzU0Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoiYWdyaWNvbGUiLCJwdWJsaWNfa2V5IjoiMHg3QTI3NzUzZTMwNWRDMDQ1ZUZGNkRmQTQzZDEwMzFlZjM4ZkIzQ2UyIiwicHJpdmF0ZV9rZXkiOiIweDIwMGMyNDI4YmQwNTlmMWQyNWFhMjAyZDM5YmZmMmE0ODE4NTY1ZTRhOWFhM2E2NzZmOWM3MjkxN2VjMGQzODciLCJleHAiOjI1MzQwMjIxNDQwMH0.8MSmnFysI3EEfmG2eL3lPnNk89dpYAtIcGdmlXTWHYM');

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
 

   
 


}


