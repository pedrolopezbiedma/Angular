// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// NgRx
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAppReducer from './store/app.reducer'
import { AuthenticationEffects } from './authentication/store/authentication.effects';
import { RecipeBookEffects } from './recipe-book/store/recipe-book.effects';

// Other Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Components, Services & Models
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    StoreModule.forRoot(fromAppReducer.AppReducer),
    EffectsModule.forRoot([AuthenticationEffects, RecipeBookEffects]),
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
