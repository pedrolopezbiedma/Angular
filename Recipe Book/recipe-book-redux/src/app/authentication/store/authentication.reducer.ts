// NgRx
import { Action, createReducer, on } from "@ngrx/store";
import * as AuthenticationActions from './authentication.actions';

// Components, Services & Models
import { User } from "src/app/shared/models/user.model";

// State Interface
export interface AuthenticationState {
  isLoading: boolean;
  error: string;
  user: User;
}

// Initial State
const initialState: AuthenticationState = {
  isLoading: false,
  error: null,
  user: null
}

const _authenticationReducer = createReducer(
  initialState,

  on(AuthenticationActions.loginStartAction, (state, action) => {
    return {
      ...state,
      isLoading: true,
      error: null,
      user: null
    }
  }),

  on(AuthenticationActions.loginSuccessAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      user: action.user
    }
  }),

  on(AuthenticationActions.loginErrorAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.errorMessage,
      user: null
    }
  }),

  on(AuthenticationActions.logoutAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      user: null
    }
  })

);

export function AuthenticationReducer(state: AuthenticationState, action: Action) {
  return _authenticationReducer(state, action);
}
