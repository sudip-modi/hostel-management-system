import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHelpComponent } from './view-help/view-help.component';



@NgModule({
  declarations: [
    ViewHelpComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ViewHelpComponent]
})
export class SharedModule { }
