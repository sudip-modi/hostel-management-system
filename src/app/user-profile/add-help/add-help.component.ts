import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AddHelpService } from 'src/app/add-help.service';

@Component({
  selector: 'app-add-help',
  templateUrl: './add-help.component.html',
  styleUrls: ['./add-help.component.css']
})
export class AddHelpComponent implements OnInit {
helpList:Help[]=[];

  userHelpForm:FormGroup;
  constructor(private ahs:AddHelpService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.userHelpForm=new FormGroup({
      username:new FormControl(null),
      hostelid: new FormControl(null),
     email: new FormControl(null),
     contactno: new FormControl(null),
     roomno: new FormControl(null),
     hostel: new FormControl(null),
     helpbox: new FormControl(null)
 })
  }

userHelp(){
  this.ahs.createNewHelp(this.userHelpForm.value).subscribe({
    next:(res)=>{
      alert('Submitted Successfully')
      this.router.navigate(['../view-help'],{relativeTo:this.route})
//       this.ahs.getHelp().subscribe({
//         next:(helps)=>{
//           this.helpList=helps;

// alert('Submitted Successfully')
//         },
//         error:(err)=>{
//           console.log("err is ",err)
//         }
//       })
    },
    error:(err)=>{
    console.log("err is ",err)}
  })
}

  
 
    }
    export interface Help{
      username:string;
      hostelid:number;
      email:string;
      contactno:string;
      roomno:string;
      hostel:string;
      helpbox:string;
      dob:Date;

    }
