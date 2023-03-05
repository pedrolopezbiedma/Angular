// Angular
import { EventEmitter, Injectable, Output } from '@angular/core';

// Components, Services & Models
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  @Output() updatedIngredients = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.updatedIngredients.emit(this.getIngredients());
  }
}
