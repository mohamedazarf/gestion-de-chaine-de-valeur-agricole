import { Component } from '@angular/core';
import { AmdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  userValue = '';
  transactionValue = '';
  productValue = '';
constructor(private adminService:AmdminServiceService){}
  ngOnInit() {
    // Generate random values for the first 3 seconds
    this.getUsers2(); this.getAllOffers();
    let count = 0;
    const interval = setInterval(() => {
      if (count < 3) {
        this.userValue = Math.floor(Math.random() * 2000 + 1000).toString();
        this.transactionValue = Math.floor(Math.random() * 5000 + 2000).toString();
        this.productValue = Math.floor(Math.random() * 1000 + 500).toString();
        count++;
      } else {
        clearInterval(interval);
        this.userValue = this.numberOfUsers.toString();
        this.transactionValue = '4,592';
        this.productValue = this.numberOfProducts.toString();
      }
    }, 500);
    this.startAnimation(0);

  }
 
  lines=[
    { text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse nihil maxime ad.', visible: false },
    { text: 'Vero fugit est nulla ratione consectetur pariatur eius dicta?', visible: false },
    { text: 'Eos veritatis quisquam assumenda dolorem sequi dolorum, modi officiis.', visible: false }
  ];
  startAnimation(index: number) {
    if (index < this.lines.length) {
      this.lines[index].visible = true;
      const lineElement = document.querySelector(`#lora .line:nth-child(${index + 1})`) as HTMLElement;
      lineElement.style.setProperty('--line-index', `${index}`);
      const duration = this.lines[index].text.length * 50;
      setTimeout(() => {
        this.startAnimation(index + 1);
        console.log("animation" + index);
      }, duration);
    }
  }
numberOfUsers:number;
  public getUsers2(){
    this.adminService.temchiBidhnallah3()
    .subscribe(
      (response) => {
        let text = JSON.stringify(response);
        let users = JSON.parse(text); // convert string response to JSON object
      
      this.numberOfUsers=users.data.length;
        return users;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  numberOfProducts:number;
  getAllOffers() {
    this.adminService.getAllOffers().subscribe(
      (response) => {
  
       this.numberOfProducts=response.data.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
