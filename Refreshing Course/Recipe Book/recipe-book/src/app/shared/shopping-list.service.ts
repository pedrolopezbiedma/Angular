// Angular
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Components, Services & Models
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  updatedIngredients = new Subject<Ingredient[]>();
  selectedIngredient = new Subject<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient(Math.floor(Math.random() * 1000), 'Apples', 5),
    new Ingredient(Math.floor(Math.random() * 1000), 'Tomatoes', 10),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.updatedIngredients.next(this.getIngredients());
  }

  editIngredient(editedIngredient: Ingredient){
    let index = this.ingredients.findIndex((ingredient: Ingredient) => {
      return ingredient.ingredientId === editedIngredient.ingredientId
    })

    this.ingredients[index] = editedIngredient;
    this.updatedIngredients.next(this.getIngredients());
  }

  removeIngredient(removeIngredient: Ingredient): void {
    let index = this.ingredients.findIndex((ingredient: Ingredient) => {
      return ingredient.ingredientId === removeIngredient.ingredientId
    })

    this.ingredients.splice(index, 1)
    this.updatedIngredients.next(this.getIngredients());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient: Ingredient) => {
      this.addIngredient(ingredient);
    })
  }

  emitSelectedIngredient(ingredient: Ingredient): void {
    this.selectedIngredient.next(ingredient);
  }
}
