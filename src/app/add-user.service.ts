import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AddUser } from './admin-profile/view-users/view-users.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
 
  
  constructor(private hc:HttpClient) { }
 // Function to get all users
 getAddUser(): Observable<AddUser[]> {
  return this.hc.get<AddUser[]>(`${this.apiUrl}/view-users`);
}
  createNewAddUser(userAddObj){
return this.hc.post(' http://localhost:4000/adduser-api/add-user',userAddObj)
  }
//   getAddUser(){
// return this.hc.get<AddUser[]>(' http://localhost:4000/adduser-api/add-user')
//   }
// getCurrentData(id:number){
//   return this.hc.get(`http://localhost:3000/add-users/${id}`);
// }
// updateUser(id: number,data: any){
//   return this.hc.put(`http://localhost:3000/add-users/${id}`,data);
// }

// Inside add-user.service.ts

private apiUrl = 'http://localhost:4000/adduser-api';
getCurrentData(id: number): Observable<any> {
  return this.hc.get(`http://localhost:4000/adduser-api/update-user/${id}`);
}


updateUser(id: number, userData:any): Observable<any> {
  const url = `http://localhost:4000/adduser-api/update-user/${id} `;
  return this.hc.put(url, userData);
}

  // deleteData(id:number ){
  //   return this.hc.delete(`http://localhost:3000/add-users/${id}`);
  // }

  deleteData(id: number): Observable<any> {
    return this.hc.delete(`${this.apiUrl}/delete-user/${id}`);
  }
  
 

}