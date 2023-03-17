// NgRx
import { createAction, props } from "@ngrx/store";

// Components, Services & Models
import { Recipe } from "../recipe.model";
import { User } from "src/app/shared/models/user.model";

export const initializeRecipesAction = createAction(
  '[Recipe Book] Initialize Recipes',
  props<{ recipes: Recipe[] }>()
)
export const addRecipe = createAction(
  '[Recioe Book] Add Recipe',
  props<{ recipe: Recipe }>()
)

export const editRecipe = createAction(
  '[Recipe Book] Edit Recipe',
  props<{ recipe: Recipe }>()
)

export const deleteRecipe = createAction(
  '[Recipe Book] Delete Recipe',
  props<{ recipe: Recipe }>()
)

export const fetchRecipes = createAction(
  '[Recipe Book] Fetch Recipes from Firebase',
  props<{ user: User }>()
)

export const storeRecipes = createAction(
  '[Recipe Book] Store Recipes in Firebase',
  props<{ user: User }>()
)
