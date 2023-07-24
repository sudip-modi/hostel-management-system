// import { Component,OnInit } from '@angular/core';


// @Component({
//   selector: 'app-my-profile',
//   templateUrl: './my-profile.component.html',
//   styleUrls: ['./my-profile.component.css']
// })
// export class MyProfileComponent implements OnInit{
//   userObj:User;
//   constructor(private us:UserService){}
//     ngOnInit(): void {
//       this.us.getCurrentUser().subscribe({
//         next:(user)=>this.userObj=user,
//         error:(err)=>console.log(err)
//       })
//     }
// }
import { Component ,OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit {
  currentUser={};

  confidentialData:string;
  constructor(private us:UserService,private hc:HttpClient){}

  ngOnInit(): void {
    this.us.getDetailsOfCurrentUser().subscribe({
      next:(userDetails)=>{
        console.log(userDetails)
        this.currentUser=userDetails['currentUser'];
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  getProtectedData(){
    this.hc.get('http://localhost:4000/user-api/test-private')
    .subscribe({
      next:(data)=>{
        this.confidentialData=data['message'];
      },
      error:(err)=>console.log(err)
    })
  }
}
