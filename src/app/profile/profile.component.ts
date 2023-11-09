import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
 
})
export class ProfileComponent {
  userType: string | null;

  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'];
    });
  }
  isCollapsed = true;
 
  showSection: boolean = false;
  showScoreTitle:boolean;

  toggleSection(sectionId: string,event:MouseEvent) {
    if (sectionId === 'gestionUtilisateur') {
      event.preventDefault();
      this.showSection = !this.showSection;
    } 
  }

  


  
    
  
  


}
