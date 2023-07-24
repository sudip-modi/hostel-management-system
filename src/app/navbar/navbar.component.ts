// import { Component,OnInit } from '@angular/core';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit{
//   status:boolean;
//   constructor(public us:UserService){}
//   ngOnInit(): void {
//     this.us.getUserLoginStatus().subscribe({
//       next:(status)=>{this.status=status},
//             error:(err)=>{
//               console.log("err is ",err)
//             }
      
//           }) 
//   }
//   userLogout(){
//     this.us.setUserLoginStatus(false)
//     this.us.setCurrentUser(null)
//   }
// }
import { Component,OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoginStatus:boolean;
  constructor(private us:UserService){}

  ngOnInit(): void {
    this.us.getDetailsOfCurrentUser().subscribe({
      next:(userDetails)=>{
        this.userLoginStatus=userDetails['userLoginStatus']
      }
    })
  }

  logOut(){
    //remove token from local/session storage
    localStorage.removeItem('token')
    //reset user status
    this.us.setDetailsOfCurrentUser({currentUser:{},userLoginStatus:false})
  }

}
