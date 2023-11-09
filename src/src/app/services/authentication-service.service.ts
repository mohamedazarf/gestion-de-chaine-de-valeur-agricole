import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../adminPages/list-of-users/list-of-users.component';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  connected=false; role:string;
  // userTypeUpdated: EventEmitter<string> = new EventEmitter<string>();


  constructor(private http:HttpClient,private router: Router) { }
  // setUserType(userType: string) {
  //   this.userTypeUpdated.emit(userType);
  // }
  
  login(password:string){
    if(password==="adminPass"){
      console.log("t3ada");
      // this.router.navigate(['listOfUsers']);
      this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'admin' } });
      this.loggedIn.next(true);
      this.connected=true; 
      this.role='admin';
    }
    if(password==="userPass"){
      // this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'user',userRole:'agriculteur' } });
      this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'user',userRole:'transformateur' } });

      this.loggedIn.next(true);
      this.connected=true; 
      this.role='user';
    }
    
  }
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private userTypeSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private userPublicKeySubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  userType$ = this.userTypeSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();
  userPublicKeySubject$ = this.userTypeSubject.asObservable();

  setUserRole(role: string) {
    this.userRoleSubject.next(role);
  }

  setUserType(type: string) {
    this.userTypeSubject.next(type);
  }
  
  setUserId(id: string) {
    this.userIdSubject.next(id);
  }

  setUserPublicKey(publicKey: string) {
    this.userPublicKeySubject.next(publicKey);
  }

  login2(){
    const token = this.getCookieValue('loggedUser'); // Get the token from the cookie

    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userRole = decodedToken.role; // Extract the user role from the decoded token
      const userType = decodedToken.type; // Extract the user type from the decoded token
    const id=decodedToken.user_id;
    const public_key=decodedToken.public_key;
      console.log('User Role:', userRole);
      console.log('User Type:', userType);
      console.log('_id:', id);
      console.log('public_key:', public_key);
      this.setUserRole(userRole);          this.setUserId(id);
      this.setUserType(userType);          this.setUserPublicKey(public_key);  
      if(userRole === 'admin'){
        this.loggedIn.next(true); this.connected=true; 
        this.router.navigate(['listOfUsers'],{ queryParams: {userType: userRole }});
        
      }
      else{
        this.loggedIn.next(true); this.connected=true; 
        this.router.navigate(['listOfUsers'],{ queryParams: { userType: userRole,userRole:userType } });
      }
    } else {
      console.log('Token not found');
    } 
  }


  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.connected=false;
    document.cookie = 'loggedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    this.connected=true;
    return this.loggedIn;
  }


  

//   usersData$ = new BehaviorSubject<any>(null);
//   cnx(){
//   this.http.get('http://localhost:5000/api/admin/users', this.httpOptions)
//   .subscribe(
//     (data) => {
//     const d=JSON.stringify(data)
//     this.usersData$.next(data);
//     console.log("data is ==="+this.usersData$);
//   },(error) => {
//   }

//   );
// }

cnx3(){
  console.log("cnx3--------------------")
  this.http.get('http://localhost:5000/api/admin/users', { responseType: 'text' }).subscribe(
    (response) => {
      // const message = JSON.parse(response).message;
      console.log(response);
      console.log("type de reponse ==="+typeof(response))
      return response;
    },
    (error) => {
      console.error(error);
    }
  );
}


hetlusers(){
  this.http.get('http://localhost:5000/api/admin/users', { responseType: 'text' }).subscribe(
    (response) => {
      // const message = JSON.parse(response).message;
      console.log(response);
      console.log("type de reponse ==="+typeof(response))
      
    },
    (error) => {
      console.log("fama hkeya mech heya")
      console.error(error);
    }
  );
}
users: User[] = [];
cnn4() {
  this.http.get('http://localhost:5000/api/admin/users',{ responseType: 'text' }).subscribe(
    (response) => {
      // this.users = response;
     let text=JSON.stringify(response)
      console.log("respone == text"+ text)
      let array=text.split('\n')
      console.log(" type howa "+typeof(array))
      let cleantext=text.replace("\n", " ").toUpperCase();
      console.log("newRes===="+cleantext)
      console.log(typeof(text))
      
      return JSON;
    },
    (error) => {
      console.error(error);
    }
  );
}

userData: User = {} as User;
cnx5() {
  console.log("cnx 5 executed")
  this.http.get<User>('http://localhost:5000/api/admin/users').subscribe(
    
    (response) => {
      this.userData = response;
  
      console.log("user data ===="+this.userData)
    },
    (error) => {
      console.error(error);
      console.log("fama haja");
    }
  );
}








getUserById(id:any){
  const url=`localhost:5000/api/admin/users/${id}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc"
    }`
  });
  return this.http.get(url,{headers});
  }
sendMessage(cin:any):Observable<any>{
  const url='http://localhost:5000/api/shared/login';
  const requestBody = { cin:cin };
return this.http.post(url,requestBody);
}

verifyCode(otp_code:any,idUser:any):Observable<any>{
const url='http://localhost:5000/api/shared/login_verification';
const requestBody = { otp_code:otp_code , _id:idUser };
let cookie = document.cookie
const headers = new HttpHeaders().set('Cookie', cookie);
return this.http.post(url,requestBody);
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
