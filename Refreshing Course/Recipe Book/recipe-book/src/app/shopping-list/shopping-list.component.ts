// Angular
import { Component, OnInit } from '@angular/core';

// Components, Services & Models
import { ShoppingListService } from '../shared/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.updatedIngredients.subscribe((updatedIngredients: Ingredient[]) => {
      this.ingredients = updatedIngredients;
    })
  }
}
