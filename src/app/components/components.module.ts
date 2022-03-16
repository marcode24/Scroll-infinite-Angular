import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  exports: [
    InfiniteScrollComponent
  ]
})
export class ComponentsModule { }
