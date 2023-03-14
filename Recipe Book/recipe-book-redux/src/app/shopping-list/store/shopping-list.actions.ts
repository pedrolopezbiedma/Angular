// NgRx
import { Action } from '@ngrx/store';

// Models
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredientsAction implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class EditIngredientAction implements Action {
  readonly type = EDIT_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class RemoveIngredientAction implements Action {
  readonly type = REMOVE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export type ShoppingListActionsType =
  AddIngredientAction |
  AddIngredientsAction |
  EditIngredientAction |
  RemoveIngredientAction;
