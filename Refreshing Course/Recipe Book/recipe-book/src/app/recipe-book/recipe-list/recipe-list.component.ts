// Angular
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Component, Services & Model
import { RecipesService } from 'src/app/shared/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() clickedRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipesService: RecipesService){}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }
}
