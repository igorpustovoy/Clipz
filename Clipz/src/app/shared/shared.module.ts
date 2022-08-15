// import { ModalService } from './../services/modal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    ModalComponent
  ],
  // providers: [ModalService]
})
export class SharedModule { }
