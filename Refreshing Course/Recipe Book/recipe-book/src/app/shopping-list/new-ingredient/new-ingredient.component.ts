// Angular
import { Component, EventEmitter, Output } from '@angular/core';

// Components & Models
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css']
})
export class NewIngredientComponent {
  @Output() addedIngredient = new EventEmitter<Ingredient>();
  name: string = '';
  amount: number = 0;

  constructor(private shoppingListService: ShoppingListService){}

  onAddIngredient(): void {
    // this.addedIngredient.emit(new Ingredient(this.name, this.amount));
    this.shoppingListService.addIngredient(new Ingredient(this.name, this.amount));
    this.clearForm();
  }

  clearForm(): void {
    this.name = '';
    this.amount = 0;
  }
}
