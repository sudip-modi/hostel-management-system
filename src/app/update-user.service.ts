import { Injectable } from '@angular/core';
// import { UpdateUser } from './admin-profile/update-user/update-user.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  constructor(private hc:HttpClient) {}

  private apiUrl = 'http://localhost:4000/updateuser-api';

//   getAddUser(): Observable<UpdateUser[]> {
//     return this.hc.get<UpdateUser[]>(`${this.apiUrl}/view-users`);
//   }

  createNewAddUser(userAddObj) {
    return this.hc.post(
      this.apiUrl+'/update-user',
      userAddObj
    );
  }

  getCurrentData(id: number): Observable<any> {
    return this.hc.get(`http://localhost:4000/updateuser-api/get-user/${id}`);
  }

//   update the user
  updateUser(id: number, userData: any): Observable<any> {
    console.log("Updating");
    const url = `http://localhost:4000/updateuser-api/update-user/${id} `;
    return this.hc.put(url, userData);
  }

  deleteData(id: number): Observable<any> {
    return this.hc.delete(`${this.apiUrl}/delete-user/${id}`);
  }
}
