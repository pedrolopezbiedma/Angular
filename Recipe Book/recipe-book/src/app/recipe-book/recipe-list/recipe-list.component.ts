// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Component, Services & Model
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesSubscription: Subscription;
  recipes: Recipe[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ){}

  ngOnInit() {
    this.recipesSubscription = this.recipesService.updatedRecipes.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
