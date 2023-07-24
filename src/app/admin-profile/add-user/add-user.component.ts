import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AddUserService } from 'src/app/add-user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  // usersAddList:AddUser[]=[];
  
  male=['Balaji Hostel','Ranichak Hostel','P1 Hostel','P2 Hostel','P3 Hostel'];
female=['BR Hostel','Tamalika Ponda Seth Hall of Residence','Matangini Hall of Residence'];
  userSelectedHostelList=[];
  userForm: FormGroup;
  errorMsg:string;
 constructor(private aus:AddUserService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
   this.userForm= new FormGroup({
  id:new FormControl(null),
    username:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30),Validators.pattern(/^[a-zA-Z\s]+$/)]),
    hostel_id:new FormControl(null,[Validators.required,Validators.pattern('[0-9]{3}$')]),
    student_id:new FormControl(null,[Validators.required,Validators.minLength(7),Validators.maxLength(7),Validators.pattern('^[a-zA-Z0-9]+$')]),
    dob:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required]),
    contactno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]{10}$')]),
    roomno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]{3}$')]),
   
      city:new FormControl(null,[Validators.required]),
      street:new FormControl(null,[Validators.required]),
      pincode:new FormControl(null,[Validators.required]),
  
  
    selectedGender:new FormControl(null,[Validators.required]),
    selectedYear:new FormControl(null,[Validators.required]),
    selectedHostel:new FormControl('',[Validators.required]),
    
    roomtype:new FormControl(null,[Validators.required]),
    
    
    


   })
  }

 
  
  getUserSelection(){
  
  if(this.userForm.value.selectedGender=='male'){
  
  this.userSelectedHostelList=this.male;
  }
  
  else{
   this.userSelectedHostelList=this.female;
  
   }
  }
  has2Error(){
    return this.userForm.get('selectedHostel').invalid && (this.userForm.get('selectedHostel').touched )
  
  
   }
  get username(){
  
    return this.userForm.get('username')
    
    }
    hasErrorusername(){
      return this.username.invalid && (this.username.dirty||this.username.touched)
    }
   get selectedYear(){
    return this.userForm.get('selectedYear');
   }
   hasErrorselectedYear(){
    return this.selectedYear.invalid && (this.selectedYear.dirty||this.selectedYear.touched)
  }
  get selectedGender(){
    return this.userForm.get('selectedGender');
   }
   hasErrorselectedGender(){
    return this.selectedYear.invalid && (this.selectedGender.dirty||this.selectedGender.touched)
  }
  get roomtype(){
    return this.userForm.get('roomtype');
   }
   hasErrorroomtype(){
    return this.roomtype.invalid && (this.roomtype.dirty||this.roomtype.touched)
  }

    get hostel_id(){
  
      return this.userForm.get('hostel_id')
      
      }
      hasErrorhostel_id(){
        return this.hostel_id.invalid && (this.hostel_id.dirty||this.hostel_id.touched)
      }
     

      get dob(){
  
        return this.userForm.get('dob')
        
        }
        hasErrordob(){
          return this.dob.invalid && (this.dob.dirty||this.dob.touched)
        }


        get roomno(){
  
          return this.userForm.get('roomno')
          
          }
          hasErrorroom(){
            return this.roomno.invalid && (this.roomno.dirty||this.roomno.touched)
          }
          get contactno(){
  
            return this.userForm.get('contactno')
            
            }
            hasErrorcontactno(){
              return this.contactno.invalid && (this.contactno.dirty||this.contactno.touched)
            }

            get email(){
  
              return this.userForm.get('email')
              
              }
              hasErroremail(){
                return this.email.invalid && (this.email.dirty||this.email.touched)
              }
          

          get city(){
  
            return this.userForm.get('city')
            
            }
            hasErrorcity(){
              return this.city.invalid && (this.city.dirty||this.city.touched)
            }
  



            get street(){
  
              return this.userForm.get('street')
              
              }
              hasErrorstreet(){
                return this.street.invalid && (this.street.dirty||this.street.touched)
              }

              get pincode(){
  
                return this.userForm.get('pincode')
                
                }
                hasErrorpincode(){
                  return this.pincode.invalid && (this.pincode.dirty||this.pincode.touched)
                }
      



      get student_id(){
  
        return this.userForm.get('student_id')
        
        }
        hasErrorstudent_id(){
          return this.student_id.invalid && (this.student_id.dirty||this.student_id.touched)
        }
      

      
onFormSubmit(){

  let newUser=this.userForm.value;
 
  if(this.userForm.valid){
 
 
  this.aus.createNewAddUser(newUser).subscribe({
    next:(res)=>{
     console.log(res)
      if(res['message']=='create new user'){
        this.errorMsg='';
        //navigate to login
        console.log("res is ", res)
    alert('Registration Successful')
    this.router.navigate(['../view-users'],{relativeTo:this.route})

        
        
      }
      else{
        this.errorMsg=res['message']
      }
    },
    error:(err)=>{console.log(err)}
  })


}
else{
  console.log('form is invalid')
}
}


}
