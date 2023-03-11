// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

// Components & Models
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

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
    private shoppingListService: ShoppingListService
  ){}

  ngOnInit(): void {
    this.selectedIngredientSubscription = this.shoppingListService.selectedIngredient.subscribe((selectedIngredient: Ingredient) => {
      this.editMode = true;
      this.ingredientId = selectedIngredient.ingredientId;
      this.name = selectedIngredient.name;
      this.amount = selectedIngredient.amount
    })
  }

  onSubmitIngredient(newIngredientForm: NgForm): void {
    if(this.editMode){
      this.shoppingListService.editIngredient(new Ingredient(this.ingredientId, newIngredientForm.value.name, newIngredientForm.value.amount));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(Math.floor(Math.random() * 1000), newIngredientForm.value.name, newIngredientForm.value.amount));
    }
    this.clearForm(newIngredientForm);
  }

  onDeleteIngredient(newIngredientForm: NgForm): void {
    this.shoppingListService.removeIngredient(new Ingredient(this.ingredientId, this.name, this.amount));
    this.clearForm(newIngredientForm);
  }

  onClearForm(newIngredientForm: NgForm): void {
    this.clearForm(newIngredientForm);
  }

  ngOnDestroy(): void {
    this.selectedIngredientSubscription.unsubscribe();
  }

  private clearForm(newIngredientForm: NgForm): void {
    newIngredientForm.reset();
    this.editMode = false;
  }
}
