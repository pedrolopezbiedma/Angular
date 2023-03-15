// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer'
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';

// Components, Services & Models
import { RecipesService } from 'src/app/recipe-book/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private recipesService: RecipesService,
    private store: Store<fromAppReducer.AppState>
  ){}

  ngOnInit() {
    this.route.params.subscribe((routeParams: Params) => {
      this.recipe = this.recipesService.getRecipe(routeParams['recipeId'])
    })
  }

  onToShoppingList(): void {
    this.store.dispatch(new shoppingListActions.AddIngredientsAction(this.recipe.ingredients));
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipesService.deleteRecipe(this.recipe);
    this.router.navigate(['recipe-book'])
  }
}
