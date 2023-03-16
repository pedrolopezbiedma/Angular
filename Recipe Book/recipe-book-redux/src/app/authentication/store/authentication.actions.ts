import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const loginStartAction = createAction(
  '[Authentication] LOGIN_START',
  props<{ email: string, password: string }>()
)

export const loginSuccessAction = createAction(
  '[Authentication] LOGIN_SUCCESS',
  props<{ user: User }>()
)

export const loginErrorAction = createAction(
  '[Authentication] LOGIN_SUCCESS',
  props<{ errorMessage: string }>()
)

export const logoutAction = createAction(
  '[Authentication] LOGOUT'
)

