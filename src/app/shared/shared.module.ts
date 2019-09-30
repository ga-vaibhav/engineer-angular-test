import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ModalComponent],
  exports: [CommonModule, FormsModule],
  entryComponents: [ModalComponent],
  providers: []
})
export class SharedModule { }
