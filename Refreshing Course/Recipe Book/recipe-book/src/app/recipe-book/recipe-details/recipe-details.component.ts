// Angular
import { Component, Input } from '@angular/core';

// Components, Services & Models
import { ShoppingListService } from '../../shared/shopping-list.service'
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService){}

  onToShoppingList(): void {
    this.shoppingListService.toShoppingList(this.recipe.ingredients);
  }
}
