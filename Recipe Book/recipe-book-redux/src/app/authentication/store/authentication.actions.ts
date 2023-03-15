import { Action } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const LOGIN = '[Authentication] LOGIN';
export const LOGOUT = ' [Authentication] LOGOUT';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {};
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor(){};
}

  export type AuthenticationActionsType =
  LoginAction |
  LogoutAction;
