import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../adminPages/list-of-users/list-of-users.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmdminServiceService {
 
  private apiServerUrl = environment.apiServerUrl;
  constructor(private http:HttpClient) { }
  adminToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhjNGE4ZGJkOTNkYmY4NzkwMDE1Iiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4NUIyQzBGQTI1QTc3QzdCZjJEN2NiNzRCY2I3N2ExQ0RGNGE3MDkxQiIsInByaXZhdGVfa2V5IjoiMHgzYTc0OGVjNGZlMDgwZDc5OWI3YTA2ZTgwNTJhMTZkZGE1YTQxMDM2ZmRhNDYzYjExYWYwZjQyODBkN2ZmYjgwIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.IBQQlI-NbS6v5qqgFUz0mU3cTuoA0Emei_Hro91mFOU'
  // #user:
  // Farmer
  // "accec_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkNzBmZTg0ZTEzMWQzOGIyMzU0Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoiYWdyaWNvbGUiLCJwdWJsaWNfa2V5IjoiMHg3QTI3NzUzZTMwNWRDMDQ1ZUZGNkRmQTQzZDEwMzFlZjM4ZkIzQ2UyIiwicHJpdmF0ZV9rZXkiOiIweDIwMGMyNDI4YmQwNTlmMWQyNWFhMjAyZDM5YmZmMmE0ODE4NTY1ZTRhOWFhM2E2NzZmOWM3MjkxN2VjMGQzODciLCJleHAiOjI1MzQwMjIxNDQwMH0.8MSmnFysI3EEfmG2eL3lPnNk89dpYAtIcGdmlXTWHYM"
  
  // transformer
  accec_token :  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkZDVmZTg0ZTEzMWQzOGIyMzU2Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoidHJhbnNmb3JtYXRldXIiLCJwdWJsaWNfa2V5IjoiMHhFOTM5M0M3YjhFRWRBYjA1RDllOTZkNkRlMzdDRjBDMDY3YzY4NTVkIiwicHJpdmF0ZV9rZXkiOiIweDllZWNkNGYyNGUxMjk0Y2U3ZGQ3MDAyYmQwMzQwNWI4YWYyMWQ5Njk0NGY5MjU5M2VhMGFkMjIyZjBlZGJlMjYiLCJleHAiOjI1MzQwMjIxNDQwMH0.nWF89LUhOC_-6shXgP-9Ue0eejXxr22-fPtLSgyihJs"


  userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkNzBmZTg0ZTEzMWQzOGIyMzU0Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoiYWdyaWNvbGUiLCJwdWJsaWNfa2V5IjoiMHg3QTI3NzUzZTMwNWRDMDQ1ZUZGNkRmQTQzZDEwMzFlZjM4ZkIzQ2UyIiwicHJpdmF0ZV9rZXkiOiIweDIwMGMyNDI4YmQwNTlmMWQyNWFhMjAyZDM5YmZmMmE0ODE4NTY1ZTRhOWFhM2E2NzZmOWM3MjkxN2VjMGQzODciLCJleHAiOjI1MzQwMjIxNDQwMH0.8MSmnFysI3EEfmG2eL3lPnNk89dpYAtIcGdmlXTWHYM';
userTokenPostman='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2ZGU5ZGMxZDIwNDI3YzhjYWU5Y2ExIiwicm9sZSI6InVzZXIiLCJ0eXBlIjoiYWdyaWNvbGUiLCJwdWJsaWNfa2V5IjoiMHg2YTJiY2MzN2VhZjE4OWVkNWQ0ZDIzY2QwOWFkZjg3OTIwMDY2MGIzYWM4M2RkYTQ1YWExOGUyNmQ5MTc0OTk5Njg4MTIxZmI1NDY0NGNmZjczMWZmNDEwMjBhNzVjOTUzMmI5MWM5NTJhYzBlYzc5MmEzMzZhYzQwYjAxMDEyZSIsImV4cCI6MjUzNDAyMjE0NDAwfQ.Jb_-njSwQ_Ey4sCgf-z31M8Cw2426bmAPD591X2O9K0'



  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    })
  };
  public temchiBidhnallah3(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:5000/api/admin/users', this.httpOptions);
  }
  public temchiBidhnallah2(){
    this.http.get('http://localhost:5000/api/admin/users',this.httpOptions).subscribe(
      (response) => {
        let text = JSON.stringify(response);
        let users = JSON.parse(text); // convert string response to JSON object
       console.log(users);
        return users;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  public temchiBidhnallah(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/api/admin/users`,this.httpOptions).pipe(
      map((users: any) => users.map((user: any) => ({ ...user, role: user.role as "admin" | "user" })))
    );
  }



  public getUserid(id_user:number):Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/api/users/${id_user}`);
    } 

  public addUsers(user:User):Observable<User>{
  return this.http.post<User>(`${this.apiServerUrl}/api/users`,user);
  }

ajouterOffreAgriculteur(stockForm: any,token:any): Observable<any> {
    const payload = {
      quantity: stockForm.value['product-quantity'],
      quality: stockForm.value['product-quality'],
      priceUnit: stockForm.value['product-price'],
      unit: stockForm.value['product-unit'],
      state: stockForm.value['product-state'],
      actorType: stockForm.value['actor-type'],
      actorRef:"64662677013ecbe516a36fec"
    };
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${
        token
      }`
    });
    return this.http.post('http://localhost:5000/api/user/offers', payload, { headers }); 
}

updateOffer(offerId: string, payload: any,token:any) {
  // todo  lezem nraja3ha connectedUserToken
  // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NzhkZDVmZTg0ZTEzMWQzOGIyMzU2Iiwicm9sZSI6InVzZXIiLCJ0eXBlIjoidHJhbnNmb3JtYXRldXIiLCJwdWJsaWNfa2V5IjoiMHhFOTM5M0M3YjhFRWRBYjA1RDllOTZkNkRlMzdDRjBDMDY3YzY4NTVkIiwicHJpdmF0ZV9rZXkiOiIweDllZWNkNGYyNGUxMjk0Y2U3ZGQ3MDAyYmQwMzQwNWI4YWYyMWQ5Njk0NGY5MjU5M2VhMGFkMjIyZjBlZGJlMjYiLCJleHAiOjI1MzQwMjIxNDQwMH0.nWF89LUhOC_-6shXgP-9Ue0eejXxr22-fPtLSgyihJs';
  // Set the headers with authorization token
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${
        token
      }`
    });
  const url = `http://localhost:5000/api/user/offers/${offerId}`;
  return this.http.put(url, payload,{headers});
}
 
  


   requestBody = {
    "cin": "10376529",
    "name":"firas",
    "email": "firas7000@gmail.com",
    "phone":"+21699123576",
    "role":"user",
    "state":"waiting",
    "type":"agricole",
    "actorInfoJson":{"localisation": "bizerte"}
    // Add more parameters as needed
  };
  


  ajouterUtilisateur(requestBodyFromForm:any): Observable<any> {
    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    return this.http.post('http://localhost:5000/api/admin/users',requestBodyFromForm, { headers });

  }





farmers:any=[];
  getAllFarmers(){
    this.http.get('localhost:5000/api/admin/agricoles');
  }


  getAgricoles(): Observable<any> {
    const url = 'http://localhost:5000/api/admin/agricoles';
    return this.http.get(url);
  }


  deleteAgricole(id:string){
    const url = `http://localhost:5000/api/admin/agricoles/${id}`;
    return this.http.delete(url);
  }
  
  deleteUser(id:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    const url = `localhost:5000/api/admin/users/${id}`;
    return this.http.delete(url);
  }


  deleteUser2(id: string): Observable<any> {

    const url = `http://localhost:5000/api/admin/users/${id}`;
    return this.http.delete(url,this.httpOptions);
  }


  updateUser(userId: string, updateData: any) {
  const url = `http://localhost:5000/api/admin/users/${userId}`;
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc';

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.adminToken}`
  });

  return this.http.put(url, updateData,this.httpOptions);
}

  

  getAllOffers(): Observable<any> {
    const url = "http://localhost:5000/api/user/offers";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get(url, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteOffer(offerId: string,token:any) {
    // Set the headers with authorization token
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${
          token
 }`
      });
    const url = `http://localhost:5000/api/user/offers/${offerId}`;
    return this.http.delete(url,{headers});
  }


  apiUrl = 'http://localhost:5000/api/admin/filter_users';
  filterUsers(state: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    // const url = `${this.apiUrl}/filter_users`;
    const url='http://localhost:5000/api/admin/filter_users';
    const requestBody = { state };
// console.log("filtred users from service");
    return this.http.post(url, requestBody,{ headers });
  }


  filterOffers(condition: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    // const url = `${this.apiUrl}/filter_users`;
    const url='http://localhost:5000/api/user/offers/filter_offers';
    const requestBody = { condition };
console.log("filtred offers from service");
    return this.http.post(url, requestBody,{ headers });
  }

  filterOffers2(actorType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${
        this.userToken
      }`
    });

    const url = 'http://localhost:5000/api/user/offers/filter_offers';
    const body = { actorType };

    return this.http.post(url, body,{headers});
  }
  filterOffersById(token:any,actorId: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${
        token
      }`
    });

    const url = 'http://localhost:5000/api/user/offers/filter_offers';
    const body = { actorRef : actorId };

    return this.http.post(url, body,{headers});
  }
 
  
  getUserByType(type: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    const apiUrl = 'http://localhost:5000/api/admin/filter_users';
    const payload = { type: type };
    return this.http.post(apiUrl, payload, {headers });
  }

getUserByReference(ref:string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.adminToken}`
  });
  const apiUrl = 'http://localhost:5000/api/admin/filter_users';
  const payload = { actorRef: ref };
  return this.http.post(apiUrl, payload, {headers });
}


searchUserById(userId: string): Observable<any> {
  const apiUrl = 'http://localhost:5000/api/admin/filter_users';
  const requestBody = { _id: userId };
  
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

 return this.http.post(apiUrl, requestBody,this.httpOptions);
}
createViolationReclamation(message:any,token:any):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
const url="http://localhost:5000/api/user/violations";
const requestBody = { msg:message  };
return this.http.post(url, requestBody,{headers});
           }


           getAllReclamations():Observable<any>{
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${this.adminToken}`
            });
          const url="http://localhost:5000/api/admin/violations";
          return this.http.get(url,{headers});
                     }
  consulterHistoriqueUtilisateur(pubKey:any,token:any):Observable<any>{
    const headers = new HttpHeaders({
'Authorization': `Bearer ${ token }`
     });
    const url="http://localhost:5000/api/user/blockchain/transaction_history";
   const requestBody = { pub_key:pubKey  };
     return this.http.post(url,requestBody,{headers});
   }
            deleteReclamation(ReclamationId: string) {
            // Set the headers with authorization token
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${ this.adminToken }`
              });
            const url = `http://localhost:5000/api/admin/violations/${ReclamationId}`;
            return this.http.delete(url,{headers});
          }

sendTransaction(){
  const url="http://localhost:5000/api/user/send_transaction";
}


acheterOffre(offerId:any,token:any){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${ token }`
  });
  const requestBody={ _id : offerId}
  const url="http://localhost:5000/api/user/offers/buy_offer";
  return this.http.post(url,requestBody,{headers})
}

getTransactionAccountHistory(token:any):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  const url='http://localhost:5000/api/user/blockchain/account_transaction_history';
  return this.http.get(url,{headers});
}

historiqueAchat(token:any):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });  
const url='http://localhost:5000/api/user/historique_achats';
return this.http.get(url,{headers});
}

}