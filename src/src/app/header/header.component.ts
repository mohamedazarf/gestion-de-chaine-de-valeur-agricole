import { Component,Input,Output ,EventEmitter, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
showLoginButton=true; loggedIn=false; buttonText=''; role:string='';
  connected:boolean;   routeUrl: string;    
  userType: string | null;
  userRole: string | null;
  userTypeSubscription: Subscription;
  userRoleSubscription: Subscription;

constructor(private router:Router,private renderer: Renderer2,private route: ActivatedRoute, public authenticationService:AuthenticationServiceService) {
  router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.routeUrl = event.url;
    }
  });

  if(this.router.url==='/login'){
    this.showLoginButton=false;
  }


    this.userTypeSubscription = this.authenticationService.userType$.subscribe(type => {
      this.userType = type;
      console.log("Type in header: ", this.userType);
      // Perform any necessary logic based on the user type
    });

    this.userRoleSubscription = this.authenticationService.userRole$.subscribe(role => {
      this.userRole = role;
      console.log("Role in header: ", this.userRole);
      // Perform any necessary logic based on the user role
    });
  }


 
 

isLoggedIn$ = this.authenticationService.isLoggedIn();
 ngOnInit() {
 
  this.authenticationService.isLoggedIn().subscribe((loggedIn) => {
    this.loggedIn = loggedIn; this.connected=this.authenticationService.connected;
    console.log("logged in ::"+this.loggedIn)
    this.buttonText = this.connected ? 'Logout' : 'Login';
    this.role=this.role;
    
  });
}

logout(): void {
  this.authenticationService.logout();
  console.log("connexion state"+this.loggedIn)
}

 
 



 
  







}

