import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userLoginStatus:boolean=false;
// currentUser:User=null;



currentUsersSubject=new BehaviorSubject({})


// userLoginStatusBehaviourSubject=new BehaviorSubject(this.userLoginStatus)
// currentUserBehaviourSubject= new BehaviorSubject(this.currentUser)

//update login status
// setUserLoginStatus(status){
//   this.userLoginStatusBehaviourSubject.next(status)
// }

// //get login status
// getUserLoginStatus(){
//   return this.userLoginStatusBehaviourSubject.asObservable();
// }
 //read data of BS
 getDetailsOfCurrentUser(){
  return this.currentUsersSubject.asObservable()
}
//update BH
setDetailsOfCurrentUser(currentUserDeatils){
  this.currentUsersSubject.next(currentUserDeatils)
}

// //update current user
// setCurrentUser(userObj){
// this.currentUserBehaviourSubject.next(userObj)
// }

// //get current user
// getCurrentUser(){
//   return this.currentUserBehaviourSubject.asObservable()
// }

  constructor(private hc:HttpClient) { }

  //create user
  // createUser(userObj){
  //   return this.hc.post('http://localhost:4000/user-api/user',userObj) //returns observable
  // }

  // userLogin(userCredentialsObject){
  //   return this.hc.get<UserCred[]>(`http://localhost:4000/user-api/user?username=${userCredentialsObject.username}`)
  // }
  createUser(newUser:any) {
    return this.hc.post('http://localhost:4000/user-api/user',newUser);
  }

  userLogin(userCredObj:any){
    return this.hc.post('http://localhost:4000/user-api/user-login',userCredObj);
  }

}
// export interface UserCred{
//   username:string,
//   password:string
// }
// export interface Address{
//   city:string;
//   street:string;
//   pincode:string;
// }
// export interface User{
//   id:number;
//   username:string;
//   password:String;
//   email:string;
// address:Address;


// }
