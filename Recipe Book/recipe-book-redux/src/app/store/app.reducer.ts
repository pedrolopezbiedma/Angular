// Reducers
import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer'
import * as fromAuthenticationReducer from '../authentication/store/authentication.reducer'
import { ActionReducerMap } from '@ngrx/store';

// App State Interface
export interface AppState {
  authentication: fromAuthenticationReducer.AuthenticationState;
  shoppingList: fromShoppingListReducer.ShoppingListState;
}

// App Reducers
export const AppReducer: ActionReducerMap<AppState> = {
  authentication: fromAuthenticationReducer.AuthenticationReducer,
  shoppingList: fromShoppingListReducer.ShoppingListReducer
};
