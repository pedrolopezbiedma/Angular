import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Angular
import { AppRoutingModule } from './app-routing.module';

// Directives
import { DropdownDirective } from './shared/dropdown.directive';

// Components, Services & Models
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from './recipe-book/recipe-details/recipe-details.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NewIngredientComponent } from './shopping-list/new-ingredient/new-ingredient.component';
import { NoSelectedRecipeComponent } from './recipe-book/no-selected-recipe/no-selected-recipe.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    NoSelectedRecipeComponent,
    RecipeDetailsComponent,
    ShoppingListComponent,
    NewIngredientComponent,
    DropdownDirective,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
