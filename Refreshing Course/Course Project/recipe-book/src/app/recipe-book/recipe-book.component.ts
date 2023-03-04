// Angular
import { Component } from '@angular/core';

// Components & Models
import { Recipe } from './recipe.model';
@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent {
  displayedRecipe: Recipe;

  onClickedRecipe(clickedRecipe: Recipe): void {
    this.displayedRecipe = clickedRecipe;
  }
}
