// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Routing
import { RecipeBookRoutingModule } from './recipe-book-routing.module';

// Components, Services & Models
import { NoSelectedRecipeComponent } from './no-selected-recipe/no-selected-recipe.component';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    NoSelectedRecipeComponent,
    RecipeDetailsComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecipeBookRoutingModule
  ]
})
export class RecipeBookModule { }
