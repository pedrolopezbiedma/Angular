// NgRx
import { Action, createReducer, on } from "@ngrx/store";
import * as ShoppingListActions from './shopping-list.actions';

// Components, Services & Models
import { Ingredient } from "src/app/shared/models/ingredient.model";

// State Interface
export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
}

// Initial State
const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient(Math.floor(Math.random() * 1000), 'Apples', 5),
    new Ingredient(Math.floor(Math.random() * 1000), 'Tomatoes', 10),
  ],
  editedIngredient: null
}

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredientAction, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient]
    }
  }),

  on(ShoppingListActions.addIngredientsAction, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients]
    }
  }),

  on(ShoppingListActions.editIngredientAction, (state, action) => {
    let editIngredientIndex = state.ingredients.findIndex((ingredient: Ingredient) => {
      return ingredient.ingredientId === action.ingredient.ingredientId
    })

    let updatedIngredient = {
      ...state.ingredients[editIngredientIndex],
      ...action.ingredient
    }

    let editedIngredients = state.ingredients.slice();
    editedIngredients[editIngredientIndex] = { ...updatedIngredient };

    return {
      ...state,
      ingredients: [...editedIngredients]
    }
  }),

  on(ShoppingListActions.removeIngredientAction, (state, action) => {
    let updatedIngredients = state.ingredients.filter((ingredient: Ingredient) => {
      return ingredient.ingredientId !== +action.ingredient.ingredientId
    })

    return {
      ...state,
      ingredients: updatedIngredients
    }
  }),

  on(ShoppingListActions.startEditIngredientAction, (state, action) => {
    return {
      ...state,
      editedIngredient: { ...action.ingredient }
    }
  }),

  on(ShoppingListActions.stopEditIngredientAction, (state, action) => {
    return {
      ...state,
      editedIngredient: null
    }
  })
)

export function ShoppingListReducer(state: ShoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
