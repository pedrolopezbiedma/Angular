// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components, Services & Models
import { NoSelectedRecipeComponent } from './no-selected-recipe/no-selected-recipe.component';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../authentication/auth.guard';

// Components, Services & Models

const routes: Routes = [
  { path: '', component: RecipeBookComponent, canActivate: [AuthGuard], children: [
    { path: '', component: NoSelectedRecipeComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':recipeId', component: RecipeDetailsComponent },
    { path: ':recipeId/edit', component: RecipeEditComponent },
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeBookRoutingModule { }
