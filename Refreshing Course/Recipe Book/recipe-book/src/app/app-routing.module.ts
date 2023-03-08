// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components, Services & Models
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { NoSelectedRecipeComponent } from './recipe-book/no-selected-recipe/no-selected-recipe.component';
import { RecipeDetailsComponent } from './recipe-book/recipe-details/recipe-details.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },
  { path: 'recipe-book', component: RecipeBookComponent, children: [
    { path: '', component: NoSelectedRecipeComponent },
    { path: ':recipeId', component: RecipeDetailsComponent }
  ]},
  { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
