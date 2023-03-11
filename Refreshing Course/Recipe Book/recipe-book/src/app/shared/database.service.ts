// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Components, Services & Models
import { RecipesService } from './recipes.service';
import { Recipe } from '../recipe-book/recipe.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DatabaseService {
  endpoint: string = 'https://angular-recipe-book-4c3e6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) { }

  fetchRecipes(): void {
    this.http.get<Recipe[]>(this.endpoint)
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
  }

  storeRecipces(): void {
    let recipes = this.recipesService.getRecipes();
    this.http.put(this.endpoint, recipes)
      .subscribe(response => {
        console.log(response);
      })
  }


}
