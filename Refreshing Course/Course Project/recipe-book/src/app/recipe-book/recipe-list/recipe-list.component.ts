// Angular
import { Component } from '@angular/core';

// Component & Model
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes:Recipe[] = [
    new Recipe('Test Recipe 1 Name', 'Test Recipe 1 Description', 'https://i.blogs.es/173514/croquetas/450_1000.jpeg'),
    new Recipe('Test Recipe 2 Name', 'Test Recipe 2 Description', 'https://i.blogs.es/173514/croquetas/450_1000.jpeg')
  ];
}
