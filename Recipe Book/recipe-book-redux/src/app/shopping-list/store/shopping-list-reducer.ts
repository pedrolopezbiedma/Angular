// Actions
import * as ShoppingListActions from './shopping-list.actions';

// Model
import { Ingredient } from '../../shared/models/ingredient.model';

// Initial State
const initialState = {
  ingredients: [
    new Ingredient(Math.floor(Math.random() * 1000), 'Apples', 5),
    new Ingredient(Math.floor(Math.random() * 1000), 'Tomatoes', 10),
  ]
}

// Reducer
export function ShoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredientAction) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      let ingredients = state.ingredients.slice();
      ingredients.push(action.payload);
      return { ...state, ingredients };

    default:
      return state;
  }

}
