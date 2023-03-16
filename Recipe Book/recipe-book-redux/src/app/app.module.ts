// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// NgRx
import { StoreModule } from '@ngrx/store';
import * as fromAppReducer from './store/app.reducer'
import { AuthenticationEffects } from './authentication/store/authentication.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

// Other Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Components, Services & Models
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    StoreModule.forRoot(fromAppReducer.AppReducer),
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreDevtoolsModule.instrument(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
