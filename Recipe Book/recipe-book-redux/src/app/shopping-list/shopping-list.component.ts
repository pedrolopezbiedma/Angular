// Angular
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// NgRx
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as ShoppingListReducer from './store/shopping-list.reducer';

// Components, Services & Models
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private store: Store<ShoppingListReducer.AppState>
  ){}

  ngOnInit(){
    this.ingredients = this.store.select('shoppingListReducer');
  }

  onSelectedShoppingListItem(ingredient: Ingredient): void {
    this.store.dispatch(new ShoppingListActions.StartEditIngredientAction(ingredient));
  }
}
