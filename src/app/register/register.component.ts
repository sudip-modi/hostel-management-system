import { Component ,OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  userRegisterForm:FormGroup;
  errorMsg:string;
  constructor(private us:UserService,private router:Router){}
  ngOnInit(): void {
    this.userRegisterForm=new FormGroup({
      username:new FormControl(null),
      password: new FormControl(null),
     email: new FormControl(null),
      address: new FormGroup({
        city:new FormControl(null),
        street:new FormControl(null),
        pincode:new FormControl(null),
  
      })
    })
  }
  registerUser(){
    let newUser=this.userRegisterForm.value;
    // let newUser=this.userRegistrationForm.value;

    // //create FormData object
    // let formData=new FormData()
    // //add selected image
    // formData.append('photo',this.file)
    // //add newUser
    // formData.append('newUser',JSON.stringify(newUser))
   
    this.us.createUser(newUser).subscribe({
      next:(res)=>{
       console.log(res)
        if(res['message']==='created'){
          this.errorMsg='';
          //navigate to login
          this.router.navigate(['/login'])
          
        }
        else{
          this.errorMsg=res['message']
        }
      },
      error:(err)=>{console.log(err)}
    })


  }
    }
    // goToLogin(){
    //   this.router.navigate(['/login'])
    // }
//     get username(){
  
//       return this.userRegisterForm.get('username')
      
//       }
//       get password(){
  
//         return this.userRegisterForm.get('password')
        
//         }
//         get email(){
  
//           return this.userRegisterForm.get('email')
          
//           }
//       hasErrorusername(){
//         return this.username.invalid && (this.username.dirty||this.username.touched)
//       }
// }


