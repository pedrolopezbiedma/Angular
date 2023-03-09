// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Components, Services & Models
import { ShoppingListService } from '../shared/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  updatedIngredientsSubscription: Subscription;
  ingredients: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService)
  {}

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();
    this.updatedIngredientsSubscription = this.shoppingListService.updatedIngredients.subscribe((updatedIngredients: Ingredient[]) => {
      this.ingredients = updatedIngredients;
    })
  }

  onSelectedShoppingListItem(ingredient: Ingredient): void {
    this.shoppingListService.emitSelectedIngredient(ingredient);
  }

  ngOnDestroy(): void {
    this.updatedIngredientsSubscription.unsubscribe();
  }
}
