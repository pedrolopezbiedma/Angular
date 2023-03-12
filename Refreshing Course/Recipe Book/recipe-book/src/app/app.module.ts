// Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Other Modules
import { AppRoutingModule } from './app-routing.module';
import { RecipeBookModule } from './recipe-book/recipe-book.module';

// Directives
import { DropdownDirective } from './shared/dropdown.directive';

// Components, Services & Models
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NewIngredientComponent } from './shopping-list/new-ingredient/new-ingredient.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingListComponent,
    NewIngredientComponent,
    DropdownDirective,
    AuthenticationComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipeBookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
