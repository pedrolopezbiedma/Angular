// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components, Services & Models
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule
  ],
  providers: [],
})
export class SharedModule { }
