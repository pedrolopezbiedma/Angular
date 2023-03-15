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
export function AuthenticationReducer( state: AuthenticationState = initialState, action){
  return state;
}
