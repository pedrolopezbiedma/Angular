// NgRx
import { createAction, props } from "@ngrx/store"

// Components, Services & Models
import { Ingredient } from "src/app/shared/models/ingredient.model"

export const addIngredientAction = createAction(
  '[Shopping List] Add Ingredient',
  props<{ ingredient: Ingredient }>()
)

export const addIngredientsAction = createAction(
  '[Shopping List] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
)

export const editIngredientAction = createAction(
  '[Shopping List] Edit Ingredient',
  props<{ ingredient: Ingredient }>()
)

export const removeIngredientAction = createAction(
  '[Shopping List] Remove Ingredient',
  props<{ ingredient: Ingredient }>()
)

export const startEditIngredientAction = createAction(
  '[ Shopping List ] Start Edit an Ingredient',
  props<{ ingredient: Ingredient }>()
)

export const stopEditIngredientAction = createAction(
  '[Shopping List Stop Edit an Ingredient]'
)
