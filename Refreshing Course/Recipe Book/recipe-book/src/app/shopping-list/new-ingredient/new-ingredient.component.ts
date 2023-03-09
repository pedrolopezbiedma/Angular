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
  name: String;
  amount: Number;

  constructor(
    private shoppingListService: ShoppingListService
  ){}

  ngOnInit(): void {
    this.selectedIngredientSubscription = this.shoppingListService.selectedIngredient.subscribe((selectedIngredient: Ingredient) => {
      this.name = selectedIngredient.name;
      this.amount = selectedIngredient.amount
    })
  }

  onAddIngredient(newIngredientForm: NgForm): void {
    this.shoppingListService.addIngredient(new Ingredient(newIngredientForm.value.name, newIngredientForm.value.amount));
    this.clearForm(newIngredientForm);
  }

  clearForm(newIngredientForm: NgForm): void {
    newIngredientForm.reset();
  }

  ngOnDestroy(): void {
    this.selectedIngredientSubscription.unsubscribe();
  }
}
