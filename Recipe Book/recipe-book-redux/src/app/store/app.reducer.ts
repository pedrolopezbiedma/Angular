// NgRx
import { ActionReducerMap } from '@ngrx/store';

// Reducers
import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer'
import * as fromAuthenticationReducer from '../authentication/store/authentication.reducer'
import * as fromRecipeBookReducer from '../recipe-book/store/recipe-book-reducer'

// App State Interface
export interface AppState {
  authentication: fromAuthenticationReducer.AuthenticationState;
  shoppingList: fromShoppingListReducer.ShoppingListState;
  recipeBook: fromRecipeBookReducer.RecipeBookState;
}

// App Reducers
export const AppReducer: ActionReducerMap<AppState> = {
  authentication: fromAuthenticationReducer.AuthenticationReducer,
  shoppingList: fromShoppingListReducer.ShoppingListReducer,
  recipeBook: fromRecipeBookReducer.RecipeBookReducer
};
