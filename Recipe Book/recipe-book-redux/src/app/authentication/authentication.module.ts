// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Other Modules
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components, Services & Models
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    FormsModule,
    AuthenticationRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [],
})
export class AuthenticationModule { }
