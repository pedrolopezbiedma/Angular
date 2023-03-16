// NgRx
import { Action, createReducer, on } from "@ngrx/store";
import * as AuthenticationActions from './authentication.actions';

// Components, Services & Models
import { User } from "src/app/shared/models/user.model";

// State Interface
export interface AuthenticationState {
  user: User;
}

// Initial State
const initialState: AuthenticationState = {
  user: null
}

const _authenticationReducer = createReducer(
  initialState,

  on(AuthenticationActions.loginSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),

);

export function AuthenticationReducer(state: AuthenticationState, action: Action) {
  return _authenticationReducer(state, action);
}
