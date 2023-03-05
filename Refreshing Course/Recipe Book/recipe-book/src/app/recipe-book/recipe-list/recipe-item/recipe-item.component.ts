// Angular
import { Component, Input } from '@angular/core';

// Components, Services & Models
import { RecipesService } from 'src/app/shared/recipes.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe:Recipe;

  constructor(private recipesService: RecipesService){}

  onSelectedRecipe(recipe: Recipe){
    this.recipesService.onSelectedRecipe(recipe);
  }
}
