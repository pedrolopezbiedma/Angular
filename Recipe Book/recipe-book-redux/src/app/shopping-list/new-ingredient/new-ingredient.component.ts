// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// NgRx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer'
import * as ShoppingListActions from '../store/shopping-list.actions'

// Components & Models
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css']
})
export class NewIngredientComponent implements OnInit, OnDestroy {
  selectedIngredientSubscription: Subscription;
  editMode = false;
  ingredientId: number;
  name: string;
  amount: number;

  constructor(
    private store: Store<fromAppReducer.AppState>
  ){}

  ngOnInit(): void {
   this.selectedIngredientSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredient){
        this.editMode = true;
        this.ingredientId = stateData.editedIngredient.ingredientId;
        this.name = stateData.editedIngredient.name;
        this.amount = stateData.editedIngredient.amount
      }
    })
  }

  onSubmitIngredient(newIngredientForm: NgForm): void {
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.EditIngredientAction(new Ingredient(this.ingredientId, newIngredientForm.value.name, newIngredientForm.value.amount)));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(new Ingredient(Math.floor(Math.random() * 1000), newIngredientForm.value.name, newIngredientForm.value.amount)));
    }
    this.clearForm(newIngredientForm);
  }

  onDeleteIngredient(newIngredientForm: NgForm): void {
    this.store.dispatch(new ShoppingListActions.RemoveIngredientAction(new Ingredient(this.ingredientId, this.name, this.amount)));
    this.clearForm(newIngredientForm);
  }

  onClearForm(newIngredientForm: NgForm): void {
    this.clearForm(newIngredientForm);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEditIngredientAction());
    this.selectedIngredientSubscription.unsubscribe();
  }

  private clearForm(newIngredientForm: NgForm): void {
    newIngredientForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEditIngredientAction());
    this.editMode = false;
  }
}
