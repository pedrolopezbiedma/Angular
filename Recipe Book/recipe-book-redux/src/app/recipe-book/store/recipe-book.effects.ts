// Angular
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

// NgRx
import { Store } from "@ngrx/store";
import * as AppReducer from '../../store/app.reducer';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipeBookActions from './recipe-book.actions';

// Components, Services & Models
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeBookEffects {

  fetchRecipesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeBookActions.fetchRecipes),
      switchMap(action => {
        return this.http.get<Recipe[]>(
          'https://angular-recipe-book-4c3e6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {
          params: new HttpParams().set('auth', action.user.token)
        })
          .pipe(
            map(recipes => {
              let updatedRecipes = [];
              recipes.forEach(recipe => {
                updatedRecipes.push({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] })
              })

              return RecipeBookActions.initializeRecipesAction({ recipes: updatedRecipes })
            })
          );
      })
    )
  );

  storeRecipesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeBookActions.storeRecipes),
      withLatestFrom(this.store.select('recipeBook')),
      switchMap(([action, recipesState]) => {
        return this.http.put(
          'https://angular-recipe-book-4c3e6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          recipesState.recipes, {
          params: new HttpParams().set('auth', action.user.token)
        })

      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppReducer.AppState>
  ) { }
}
