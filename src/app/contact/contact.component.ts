import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
constructor(private route:ActivatedRoute){}
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      
 console.log("state value tojrab  "+params['param1']);    
      // Use the query parameters as needed
    });
  }

}
