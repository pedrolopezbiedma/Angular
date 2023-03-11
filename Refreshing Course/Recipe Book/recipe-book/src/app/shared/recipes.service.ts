// Angular
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Components, Services & Models
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: 'root'})
export class RecipesService {
  updatedRecipes = new Subject<Recipe[]>();

  // private recipes:Recipe[] = [
  //   new Recipe(
  //     Math.floor(Math.random() * 1000),
  //     'Test Recipe 1 Name',
  //     'Test Recipe 1 Description',
  //     'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
  //     [new Ingredient(Math.floor(Math.random() * 1000),'Pan', 5), new Ingredient(Math.floor(Math.random() * 1000), 'Mermelada', 1)]),
  //   new Recipe(
  //     Math.floor(Math.random() * 1000),
  //     'Test Recipe 2 Name',
  //     'Test Recipe 2 Description',
  //     'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
  //     [new Ingredient(Math.floor(Math.random() * 1000), 'Patatas', 5), new Ingredient(Math.floor(Math.random() * 1000), 'Huevo', 1)]
  //     )
  // ];
    private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.updatedRecipes.next(this.recipes);
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(recipeId: number): Recipe {
    return this.recipes.find((recipe: Recipe) => {
      return recipe.recipeId === +recipeId;
    });
  }

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
    this.updatedRecipes.next(this.getRecipes());
  }

  editRecipe(updatedRecipe: Recipe): void {
    let index = this.recipes.findIndex((recipe:Recipe) => {
      return recipe.recipeId === +updatedRecipe.recipeId
    });

    this.recipes[index] = updatedRecipe;
    this.updatedRecipes.next(this.getRecipes());
  }

  deleteRecipe(removedRecipe: Recipe): void {
    let index = this.recipes.findIndex((recipe:Recipe) => {
      return recipe.recipeId === +removedRecipe.recipeId
    });

    this.recipes.splice(index, 1);
    this.updatedRecipes.next(this.getRecipes());
  }
}
