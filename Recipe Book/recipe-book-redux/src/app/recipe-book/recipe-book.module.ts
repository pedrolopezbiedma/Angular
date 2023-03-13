// Angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Other Moduñes
import { RecipeBookRoutingModule } from './recipe-book-routing.module';
import { SharedModule } from '../shared/shared.module';

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
    ReactiveFormsModule,
    RecipeBookRoutingModule,
    SharedModule
  ]
})
export class RecipeBookModule { }
