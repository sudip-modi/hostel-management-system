import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AddUserService } from 'src/app/add-user.service';



@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
  usersAddList:AddUser[]=[];
  searchID: string = '';

  constructor(private aus:AddUserService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {

   
    this.aus.getAddUser().subscribe({
      next:(users)=>{
     this.usersAddList=users;
      },
      error:(err)=>{
        console.log("erroe is ", err)
      }
    })
  }

 
 


removeStudent(id:number){
  alert('Are you sure you want to Delete? ')
  // const url= ` http://localhost:3000/add-users/:id`;
  this.aus.deleteData(id).subscribe({
   next:( response)=>{
console.log('Delete Successful',response)
this.ngOnInit();
    },
    error:(error)=>{
      console.log('Delete unSuccessful',error)
    }
})
}


}
export interface AddUser{
  id:number;
  username:string;
  dob:Date;
  email:string;
  contactno:number;
  roomno:number;
  student_id:string;
  hostel_id:number;
 
  city:string;
  street:string;
  pincode:string;
  selectedYear: string;
  selectedGender:string;
  selectedHostel:string;
roomtype:string;
}