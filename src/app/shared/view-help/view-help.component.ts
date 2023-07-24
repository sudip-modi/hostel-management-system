import { Component,OnInit } from '@angular/core';
import { AddHelpService } from 'src/app/add-help.service';

@Component({
  selector: 'app-view-help',
  templateUrl: './view-help.component.html',
  styleUrls: ['./view-help.component.css']
})



export class ViewHelpComponent implements OnInit{
  helpList:Help[]=[];
  constructor(private ahs:AddHelpService){}
  ngOnInit(): void {
    this.ahs.getHelp().subscribe({
      next:(helps)=>{
        this.helpList=helps;
  
      },
      error:(err)=>{
        console.log("err is ",err)
      }
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