// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';

// Components, Services & Models
import { AuthenticationService } from '../../authentication/authentication.service';
import { RecipesService } from '../../recipe-book/recipes.service';
import { Recipe } from '../../recipe-book/recipe.model';

@Injectable({providedIn: 'root'})
export class DatabaseService {
  endpoint: string = 'https://angular-recipe-book-4c3e6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authenticationService: AuthenticationService,
    private store: Store<fromAppReducer.AppState>
  ) { }

  fetchRecipes(): void {
    // this.authenticationService.authenticatedUser.pipe(take(1)).subscribe(authenticatedUser => {
    this.store.select('authentication')
      .pipe(
        take(1),
        map(authenticationState => {
          return authenticationState.user
        })
      ).subscribe(authenticatedUser => {
      this.http.get<Recipe[]>(this.endpoint, {
        params: new HttpParams().set('auth', authenticatedUser.token)
      })
        .pipe(map(recipes => {
          let updatedRecipes = [];
          recipes.forEach(recipe => {
            updatedRecipes.push({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] })
          })

          return updatedRecipes;
        }))
        .subscribe((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
    })
  }

  storeRecipces(): void {
    // this.authenticationService.authenticatedUser.pipe(take(1)).subscribe(authenticatedUser => {
    this.store.select('authentication')
      .pipe(
        take(1),
        map(authenticationState => {
          return authenticationState.user
        })
      ).subscribe(authenticatedUser => {
      let recipes = this.recipesService.getRecipes();

      this.http.put(this.endpoint, recipes, {
        params: new HttpParams().set('auth', authenticatedUser.token)
      })
      .subscribe(response => {
        console.log(response);
      })
    })
  }


}
