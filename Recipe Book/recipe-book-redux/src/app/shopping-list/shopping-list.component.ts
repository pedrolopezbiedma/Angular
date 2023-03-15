// Angular
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// NgRx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer'
import * as ShoppingListActions from './store/shopping-list.actions';

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
    private store: Store<fromAppReducer.AppState>
  ){}

  ngOnInit(){
    this.ingredients = this.store.select('shoppingList');
  }

  onSelectedShoppingListItem(ingredient: Ingredient): void {
    this.store.dispatch(new ShoppingListActions.StartEditIngredientAction(ingredient));
  }
}
