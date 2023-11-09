import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { AmdminServiceService } from '../services/admin-service.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCollapsed = true; regex = /^\d+$/; 
  showAlert !:boolean; showerrorMessage=false; showSuccessMessage=false;
  
constructor(private router:Router,private http:HttpClient,private authenticationService:AuthenticationServiceService,private adminService:AmdminServiceService){}

goToSubscribe(): void {
  this.router.navigate(['subscribe']);
}
password:string=''; passwordError=false;
  loginIsValid !: boolean; loginIsSubmitted:boolean=false;
  errorMessage !:string; 
  cin : number; idLoggedUser:any;
  sendMessage(cin:any){
    this.authenticationService.sendMessage(cin).subscribe(
      response=>{
        console.log(response);
        // console.log("temchi yes");
        // console.log("response.data"+response.data);
        console.log("response.data._id"+response.data._id);
        // document.cookie = `loggedUserId=${response.data._id}`;
this.idLoggedUser=response.data._id;
        // console.log("response[0]"+response[0]);
        // console.log("response[0].data"+response[0].data);
        // console.log("response[0].data[0]"+response[0].data[0]);
        // console.log("response[0].data[0]._id"+response[0].data[0]._id);
        // console.log("send message response "+response.data[0]);
      //   const id = response.data._id;
      // console.log(id); 
        
      },
      (error)=>{
        console.log(error);
        console.log("erreur fil login")
      }
      );
  }
  loggedUserTokenFromVerifyCode:any; userRole:string | null; userType:string | null;
  userId:string | null;
  verifycode(otp_code:any){
    
    this.authenticationService.verifyCode(otp_code,this.idLoggedUser).subscribe(
      (response)=>{
        console.log(this.idLoggedUser +"id user")
        console.log(response.data);
        document.cookie = `loggedUser=${response.data}`;
        this.authenticationService.login2();
        } ,
      (error)=>{
        console.log(error);
      }
      );
    
    // console.log(otp_code+" type= "+typeof(otp_code_as_num));
  }
onSubmitLogin(){
  this.loginIsSubmitted=true; 
   // regular expression to match only numbers
  // this.loginIsValid = this.regex.test(this.cin) ;
  console.log(this.cin)
  this.loginIsValid=this.cin>= 1000000 && this.cin <= 99999999
  if(this.loginIsValid){
      const cinToString=this.cin.toString()
      // console.log(cinToString+ typeof(cinToString));
     
    
      this.sendMessage(cinToString);
      console.log("phone =="+sessionStorage.getItem('phone')+'\n'+"role = "+sessionStorage.getItem('phone'))
    this.showSuccessMessage = true;
// console.log("login valid")
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 1000);
  }
  else{
    console.log("login is not valid")
    this.showerrorMessage=true;
    setTimeout(() => {
      // this.loginIsValid=true;
      this.showerrorMessage = false;
    }, 1000);
  }

}
registerIsValid !: boolean; registerIsSubmitted:boolean=false;

onSubmitRegister(){
  if(this.veriferOuEnvoyer=="verifier"){
this.registerIsSubmitted=true;
}

}
cinRegister !:number; cinRegisterIsValid !:boolean; cinSubmitted:boolean=false;
nomSignup!:string; emailSignup!:string; phoneSignup!:Text; roleSignup!:string;
stateSingup!:string; typeSignup!:string; localisationSignup!:string;
onSubmitCin(event:Event){
  this.cinSubmitted=true;
this.cinRegisterIsValid=(this.cinRegister >= 1000000 && this.cinRegister <= 99999999) ? true : false;
if(this.cinRegisterIsValid){
  console.log(this.cinRegisterIsValid);
  console.log(this.cinRegister);
  console.log(this.nomSignup);
  console.log(this.emailSignup);
  console.log(this.phoneSignup);
  console.log(this.roleSignup);
  console.log(this.stateSingup);
  console.log(this.typeSignup);
  console.log(this.localisationSignup);
    this.showSuccessMessage=true;
  setTimeout(() => {
    this.showSuccessMessage = false;
  }, 1000);
}
else{console.log(this.cinRegisterIsValid);
  event.preventDefault();
  console.log(this.cinRegister);
  console.log("4alt");
  this.showerrorMessage=true;
  setTimeout(() => {
    this.showerrorMessage = false;
  }, 1000);
}
}
 codeRegisterIsValid !:boolean; codeSubmitted:boolean=false;
 
  @ViewChild('formCode') formCode!: NgForm;
  
onSubmitCode(){
  this.codeSubmitted=true;
  if(this.formCode.valid){
  this.codeRegisterIsValid=true;
  setTimeout(this.moveLoginForm,2000);
  this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 1000);
  }
  else{
    this.codeRegisterIsValid=false;
    console.log(this.codeSubmitted);
this.showerrorMessage=true;
    setTimeout(() => {
      this.showerrorMessage = false;
    }, 1000);
  }
}


onSubmitPassword(code:any){
  console.log(this.password);
  this.verifycode(code);
  this.router.navigate(['listOfUsers'],{ queryParams: { userType: "user",userRole:"agricole" } });

// todo
  // this.authenticationService.login(this.password);
  
  // this.authenticationService.login2();
}


isHidden = false; isWaiting=false;
isActive=false;
active(){ 
  this.isActive= !this.isActive;
  console.log(this.isActive);
}
front=true;
moveLoginForm(): void {
  if(this.front){
  const loginForm = document.querySelector('.login-form') as HTMLElement;
  loginForm.style.transform = 'translateX(-550px)';
  const slideWelcome= document.querySelector('.slideWelcome') as HTMLElement;
  slideWelcome.style.transform = 'translateX(-520px)';
  slideWelcome.style.transitionDelay='.1s';
}
  else{
    const slideWelcome= document.querySelector('.slideWelcome') as HTMLElement;
  slideWelcome.style.transform = 'translateX(0)';
  slideWelcome.style.transitionTimingFunction='ease-in-out';
  const loginForm = document.querySelector('.login-form') as HTMLElement;
  loginForm.style.transform = 'translateX(0)';
  loginForm.style.transitionDelay='.1s';}
  this.front=!this.front;
}
  hide() {
    this.isHidden = true;
  }
  

  
  bouttonVerifierIsClicked=false;
  veriferOuEnvoyer="envoyer";
  bouttonVerifierClicked(){
    this.bouttonVerifierIsClicked=!false;
    this.veriferOuEnvoyer="verifier";
  }


  backToCinFunction(){
    this.loginIsValid=false;
    this.cinRegisterIsValid=false;
  }


  @ViewChild('input1', { static: true }) input1: ElementRef;
  @ViewChild('input2', { static: true }) input2: ElementRef;
  @ViewChild('input3', { static: true }) input3: ElementRef;
  @ViewChild('input4', { static: true }) input4: ElementRef;
  @ViewChild('input5', { static: true }) input5: ElementRef;
  @ViewChild('input6', { static: true }) input6: ElementRef;

  input1Value: string;
  input2Value: string;
  input3Value: string;
  input4Value: string;
  input5Value: string;
  input6Value: string;

  ngAfterViewInit() {
    this.input1.nativeElement.focus();
    this.input1.nativeElement.addEventListener('keyup', () => {
      if (this.input1Value.length === 1) {
        this.input2.nativeElement.focus();
      }
    });
    this.input2.nativeElement.addEventListener('keyup', () => {
      if (this.input2Value.length === 1) {
        this.input3.nativeElement.focus();
      }
    });
    this.input3.nativeElement.addEventListener('keyup', () => {
      if (this.input3Value.length === 1) {
        this.input4.nativeElement.focus();
      }
    });
    this.input4.nativeElement.addEventListener('keyup', () => {
      if (this.input4Value.length === 1) {
        this.input5.nativeElement.focus();
      }
    });
    this.input5.nativeElement.addEventListener('keyup', () => {
      if (this.input5Value.length === 1) {
        this.input6.nativeElement.focus();
      }
    });
  }

 

  userAdded:boolean=false; userNotAdded:boolean=false;
  ajouterUtilisateur() {
    const requestBody = {
      "cin": this.cinRegister.toString(),
      "name":this.nomSignup,
      "email": this.emailSignup,
      "phone": "+216"+this.phoneSignup,
      "role":"user",
      "state":"waiting",
      type:this.roleSignup,
      "actorInfoJson":{"localisation": "bizerte"}
      // Add more parameters as needed
    };
    console.log(requestBody);
    this.adminService.ajouterUtilisateur(requestBody).subscribe(
      (response) => {
        console.log('User added');
        this.showSuccessMessage=true;
this.userAdded=true;
setTimeout(()=>{
  this.userAdded=false; this.showSuccessMessage=false;
},1000);
      },
      (error) => {
        console.error('An error occurred', error); this.showerrorMessage=true;
 this.userNotAdded=true;
 setTimeout(()=>{
  this.userNotAdded=false; this.showerrorMessage=false;
},1000);
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