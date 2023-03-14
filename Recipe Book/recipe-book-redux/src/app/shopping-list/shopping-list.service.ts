// Angular
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// NgRx
import { Store } from '@ngrx/store';
import * as ShoppingListReducer from './store/shopping-list-reducer'
import * as ShoppingListActions from './store/shopping-list.actions';

// Components, Services & Models
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  updatedIngredients = new Subject<Ingredient[]>();
  selectedIngredient = new Subject<Ingredient>();

  constructor(
    private store: Store<ShoppingListReducer.AppState>
  ) {}

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
    // let index = this.ingredients.findIndex((ingredient: Ingredient) => {
    //   return ingredient.ingredientId === editedIngredient.ingredientId
    // })

    // this.ingredients[index] = editedIngredient;
    // this.updatedIngredients.next(this.getIngredients());
    this.store.dispatch(new ShoppingListActions.EditIngredientAction(editedIngredient));
  }

  removeIngredient(removedIngredient: Ingredient): void {
    // let index = this.ingredients.findIndex((ingredient: Ingredient) => {
    //   return ingredient.ingredientId === removeIngredient.ingredientId
    // })

    // this.ingredients.splice(index, 1)
    // this.updatedIngredients.next(this.getIngredients());
    this.store.dispatch(new ShoppingListActions.RemoveIngredientAction(removedIngredient));
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    // ingredients.forEach((ingredient: Ingredient) => {
    //   this.addIngredient(ingredient);
    // })
    this.store.dispatch(new ShoppingListActions.AddIngredientsAction(ingredients));
  }

  emitSelectedIngredient(ingredient: Ingredient): void {
    this.selectedIngredient.next(ingredient);
  }
}
