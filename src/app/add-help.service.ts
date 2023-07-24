import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Help } from './user-profile/add-help/add-help.component';


@Injectable({
  providedIn: 'root'
})
export class AddHelpService {
constructor(private hc:HttpClient){}
createNewHelp(userHelp){
  return this.hc.post('http://localhost:3000/helps',userHelp)
}
getHelp(){
  return this.hc.get<Help[]>('http://localhost:3000/helps')
}
}
