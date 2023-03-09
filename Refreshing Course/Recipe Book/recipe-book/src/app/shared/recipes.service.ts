// Angular
import { Injectable } from '@angular/core';

// Components, Services & Models
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: 'root'})
export class RecipesService {

  private recipes:Recipe[] = [
    new Recipe(
      1,
      'Test Recipe 1 Name',
      'Test Recipe 1 Description',
      'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
      [new Ingredient(Math.floor(Math.random() * 1000),'Pan', 5), new Ingredient(Math.floor(Math.random() * 1000), 'Mermelada', 1)]),
    new Recipe(
      2,
      'Test Recipe 2 Name',
      'Test Recipe 2 Description',
      'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
      [new Ingredient(Math.floor(Math.random() * 1000), 'Patatas', 5), new Ingredient(Math.floor(Math.random() * 1000), 'Huevo', 1)]
      )
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(recipeId: number): Recipe {
    return this.recipes.find((recipe: Recipe) => {
      return recipe.recipeId === +recipeId;
    });
  }

}
