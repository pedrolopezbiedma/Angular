// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Components, Services & Models
import { RecipesService } from '../../recipe-book/recipes.service';
import { Recipe } from '../../recipe-book/recipe.model';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable({providedIn: 'root'})
export class DatabaseService {
  endpoint: string = 'https://angular-recipe-book-4c3e6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authenticationService: AuthenticationService
  ) { }

  fetchRecipes(): void {
    this.authenticationService.authenticatedUser.pipe(take(1)).subscribe(authenticatedUser => {
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
    this.authenticationService.authenticatedUser.pipe(take(1)).subscribe(authenticatedUser => {
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
