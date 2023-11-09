import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: `
    <div [ngClass]="{'highlight': isHighlighted, 'small-text': isSmall}">
      This is some text
    </div>
    <button (click)="toggleHighlight()">Toggle highlight</button>
    <button (click)="toggleSize()">Toggle size</button>
  `,
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  constructor(private router:Router){}
  title = 'blockchain'; color = 'blue'; valid=true;
  background="blue";
  isColored=true; isShaped=true;isHighlighted = false;
  isSmall = false;
  goToHeader(){
    this.router.navigate(["/header"]);
  }
  notvalid(){
    return this.valid=!this.valid;
  }

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  }

  toggleSize() {
    this.isSmall = !this.isSmall;
  }
  parentMessage="this is a message from parent";

  receivedMessage: string="";

  receiveMessage(message: string) {
    this.receivedMessage = message;
  }

}
