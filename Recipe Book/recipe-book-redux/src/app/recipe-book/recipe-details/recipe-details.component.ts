// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer'
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipeBookActions from '../../recipe-book/store/recipe-book.actions';

// Components, Services & Models
import { Recipe } from '../recipe.model';
import { RecipeBookState } from '../store/recipe-book-reducer';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipeBookSubscription: Subscription;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams: Params) => {
      this.recipeBookSubscription = this.store.select('recipeBook')
        .pipe(
          map((recipeBookState: RecipeBookState) => {
            return recipeBookState.recipes;
          })
        )
        .subscribe((recipes: Recipe[]) => {
          this.recipe = recipes.find((recipe: Recipe) => {
            return recipe.recipeId === +routeParams['recipeId'];
          });
        })
    })
  }

  onToShoppingList(): void {
    this.store.dispatch(shoppingListActions.addIngredientsAction({ ingredients: this.recipe.ingredients }))
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.store.dispatch(RecipeBookActions.deleteRecipe({ recipe: this.recipe }))
    this.router.navigate(['recipe-book'])
  }

  ngOnDestroy(): void {
    this.recipeBookSubscription?.unsubscribe();
  }
}
