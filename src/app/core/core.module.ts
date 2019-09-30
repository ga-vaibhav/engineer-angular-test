import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from './services/utils.service';
import { AlgoliaService } from './services/algolia.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    UtilsService,
    AlgoliaService
  ],
  declarations: [],
  exports: []
})
export class CoreModule { }
