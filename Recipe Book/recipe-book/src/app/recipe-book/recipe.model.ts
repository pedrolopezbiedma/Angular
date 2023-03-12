// Components, Services & Models
import { Ingredient } from "../shared/models/ingredient.model";

export class Recipe {
  public recipeId: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(recipeId: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    this.recipeId = recipeId;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

}
