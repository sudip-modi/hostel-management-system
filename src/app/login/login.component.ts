// import { Component ,OnInit} from '@angular/core';
// import { FormGroup ,FormControl} from '@angular/forms';
// import {Router} from '@angular/router';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm:FormGroup;

// constructor(private router:Router,private us:UserService){}
//   ngOnInit(): void {
//     this.loginForm= new FormGroup({
//       username:new FormControl(null),
//       password:new FormControl(null),
//       userType:new FormControl(null)
//          })
//   }

//   onLogin(){
//     let userCredObj=this.loginForm.value;
//     if(userCredObj.userType=='admin'){
//       //navigate to admin profile
//       if(userCredObj.username=='admin'&& userCredObj.password=='admin'){
//         this.us.setUserLoginStatus(true)
//         this.router.navigate(['/admin-profile','admin'])
//       }
//       else{
//         alert("Invalid Credentials")
//       }
//     }
    
//     if(userCredObj.userType=='user'){
    
    
//     this.us.userLogin(userCredObj).subscribe({
//       next:(res)=>{
//     if(res.length==0){
//       alert("Invalid Credentials")
//     }
//     else{
//       if(res[0].password==userCredObj.password){
//         //update global state
//         this.us.setUserLoginStatus(true)
//         this.us.setCurrentUser(res[0])
//         //navigate to user-profile
//         this.router.navigate(['user-profile',userCredObj.username])//'/user-profile',userCredObj.username
//       }
//       else{
//         alert("Invalid Password")
//       }
//     }
//       },
//     error:(err)=>{
//       console.log("Err in user login ",err)
//     }
      
     
//     })
//     }
//     }


//     goToRegistration(){
//       this.router.navigate(['register'])
//     }
//     }
  


import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

 userLoginForm: FormGroup;
  errorMsg:string;

  constructor(private us:UserService,private router:Router){}

  ngOnInit(){
      this.userLoginForm=new FormGroup({
        username:new FormControl(''),
        password:new FormControl(''),
        userType:new FormControl(null)
       
      })
  }


  loginUser(){
    let userCredObj=this.userLoginForm.value;
    console.log(userCredObj);
    if(userCredObj.userType=='admin'){
            //navigate to admin profile
            if(userCredObj.username=='admin'&& userCredObj.password=='admin'){
              this.us.setDetailsOfCurrentUser({userLoginStatus:true})
              this.router.navigate(['/admin-profile','admin'])
            }
            else{
              alert("Invalid Credentials")
            }
          }

          if(userCredObj.userType=='user'){
    this.us.userLogin(userCredObj).subscribe({
      next:(res)=>{
     
        if(res['message']==='Login success'){
          this.errorMsg='';

          //save token in browser memory(local storage)
          localStorage.setItem('token',res['token'])
          //update BehaviourSubject with current user details
          this.us.setDetailsOfCurrentUser({currentUser:res['currentUser'],userLoginStatus:true})
          //navigate to login
          this.router.navigate(['/user-profile'])
        }
        else{
          this.errorMsg=res['message']
        }
      },
      error:(err)=>{console.log(err)}
    })
  }}
}
