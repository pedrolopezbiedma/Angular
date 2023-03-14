// Actions
import * as ShoppingListActions from './shopping-list.actions';

// Model
import { Ingredient } from '../../shared/models/ingredient.model';

export interface AppState {
  shoppingListReducer: ShoppingListState;
}

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

// Reducer
export function ShoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActionsType) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { 
        ...state,
        ingtredients:  [...state.ingredients, action.payload ]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload ]
      }

    case ShoppingListActions.EDIT_INGREDIENT:
      let editIngredientIndex = state.ingredients.findIndex((ingredient: Ingredient) => {
        return ingredient.ingredientId === action.payload.ingredientId
      })

      let updatedIngredient = {
        ...state.ingredients[editIngredientIndex],
        ...action.payload
      }

      let editedIngredients = state.ingredients.slice();
      editedIngredients[editIngredientIndex] = { ...updatedIngredient };

      return {
        ...state,
        ingredients: [ ...editedIngredients ]
      }

    case ShoppingListActions.REMOVE_INGREDIENT:
      let updatedIngredients = state.ingredients.filter((ingredient: Ingredient) => {
        return ingredient.ingredientId !== +action.payload.ingredientId
      })
      return {
        ...state,
        ingredients: updatedIngredients
      }

    default:
      return state;
  }

}
