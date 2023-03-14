// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

// NgRx
import { Store } from '@ngrx/store';
import * as ShoppingListReducer from './store/shopping-list-reducer'

// Components, Services & Models
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  updatedIngredientsSubscription: Subscription;
  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<ShoppingListReducer.AppState>
  ){}

  ngOnInit(){
    this.ingredients = this.store.select('shoppingListReducer');
    // this.store.select('shoppingListReducer').subscribe(state => {
    //   // Subscription would need to be handled
    //   this.ingredients = state.ingredients;
    // })
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.updatedIngredientsSubscription = this.shoppingListService.updatedIngredients.subscribe((updatedIngredients: Ingredient[]) => {
    //   this.ingredients = updatedIngredients;
    // })
  }

  onSelectedShoppingListItem(ingredient: Ingredient): void {
    this.shoppingListService.emitSelectedIngredient(ingredient);
  }

  ngOnDestroy(): void {
    this.updatedIngredientsSubscription.unsubscribe();
  }
}
