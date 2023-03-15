import * as AuthenticationActions from './authentication.actions'

import { User } from "src/app/shared/models/user.model";

// State Interface
export interface AuthenticationState {
  user: User;
}

// Initial State
const initialState: AuthenticationState = {
  user: null
}

// Reducer
export function AuthenticationReducer( state: AuthenticationState = initialState, action: AuthenticationActions.AuthenticationActionsType){
  switch (action.type) {
    case AuthenticationActions.LOGIN:
      return {
        ...state,
        user: action.payload
      }

    case AuthenticationActions.LOGOUT:
      return {
        ...state,
        user: null
      }

    default:
      return state;
  }
}
