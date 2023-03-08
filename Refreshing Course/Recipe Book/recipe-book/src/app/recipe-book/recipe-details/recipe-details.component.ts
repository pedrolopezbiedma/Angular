// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from 'src/app/shared/recipes.service';

// Components, Services & Models
import { ShoppingListService } from '../../shared/shopping-list.service'
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
  ){}

  ngOnInit() {
    this.route.params.subscribe((routeParams: Params) => {
      this.recipe = this.recipesService.getRecipe(routeParams['recipeId'])
    })
  }

  onToShoppingList(): void {
    this.shoppingListService.toShoppingList(this.recipe.ingredients);
  }
}
