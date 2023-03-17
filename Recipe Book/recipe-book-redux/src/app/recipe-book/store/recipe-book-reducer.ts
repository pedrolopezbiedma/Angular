// NgRx
import { Action, createReducer, on } from "@ngrx/store";
import * as RecipeBookActions from './recipe-book.actions';

// Components, Services & Models
import { Recipe } from "../recipe.model";

// State Interface
export interface RecipeBookState {
  recipes: Recipe[];
}

const initialState: RecipeBookState = {
  recipes: []
}

const _recipeBookReducer = createReducer(
  initialState,

  on(RecipeBookActions.initializeRecipesAction, (state, action) => {
    return {
      ...state,
      recipes: [...action.recipes]
    }
  }),

  on(RecipeBookActions.addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.recipe]
    }
  }),

  on(RecipeBookActions.editRecipe, (state, action) => {
    let index = state.recipes.findIndex((recipe: Recipe) => {
      return recipe.recipeId === +action.recipe.recipeId
    });

    let updatedRecipes = [...state.recipes];
    updatedRecipes[index] = action.recipe;

    return {
      ...state,
      recipes: [...updatedRecipes]
    }
  }),

  on(RecipeBookActions.deleteRecipe, (state, action) => {
    let index = state.recipes.findIndex((recipe: Recipe) => {
      return recipe.recipeId === +action.recipe.recipeId
    });

    let updatedRecipes = [...state.recipes];
    updatedRecipes.splice(index, 1);

    return {
      ...state,
      recipes: [...updatedRecipes]
    }
  })
)

export function RecipeBookReducer(state: RecipeBookState, action: Action) {
  return _recipeBookReducer(state, action);
}
