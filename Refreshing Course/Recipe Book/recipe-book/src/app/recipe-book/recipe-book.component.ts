// Angular
import { Component } from '@angular/core';

// Components, Services & Models
import { RecipesService } from '../shared/recipes.service';
import { Recipe } from './recipe.model';
@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent {
  displayedRecipe: Recipe;

  constructor(private recipesService: RecipesService){}

  ngOnInit(){
    this.recipesService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.displayedRecipe = recipe;
    });
  }
}
