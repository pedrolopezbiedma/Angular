// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';

// Components, Services & Models
import { ShoppingListService } from '../../shared/services/shopping-list.service'
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
    private router:Router,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
  ){}

  ngOnInit() {
    this.route.params.subscribe((routeParams: Params) => {
      this.recipe = this.recipesService.getRecipe(routeParams['recipeId'])
    })
  }

  onToShoppingList(): void {
    this.shoppingListService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipesService.deleteRecipe(this.recipe);
    this.router.navigate(['recipe-book'])
  }
}
