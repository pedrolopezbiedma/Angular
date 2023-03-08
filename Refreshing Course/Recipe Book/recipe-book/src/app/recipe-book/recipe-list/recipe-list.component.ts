// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Component, Services & Model
import { RecipesService } from 'src/app/shared/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ){}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
