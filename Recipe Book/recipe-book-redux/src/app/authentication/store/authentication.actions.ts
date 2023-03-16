import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const loginStartAction = createAction(
  '[Authentication] Login Start',
  props<{ email: string, password: string }>()
)

export const loginSuccessAction = createAction(
  '[Authentication] Login Success',
  props<{ user: User }>()
)

export const loginErrorAction = createAction(
  '[Authentication] Login Error',
  props<{ errorMessage: string }>()
)

export const logoutAction = createAction(
  '[Authentication] Logout'
)

