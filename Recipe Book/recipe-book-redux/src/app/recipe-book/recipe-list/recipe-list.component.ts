// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import * as AppReducer from '../../store/app.reducer'
import { RecipeBookState } from '../store/recipe-book-reducer';

// Component, Services & Model
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeBookSubscription: Subscription;
  recipes: Recipe[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit() {
    this.recipeBookSubscription = this.store.select('recipeBook')
      .pipe(
        map((recipeBookState: RecipeBookState) => {
          return recipeBookState.recipes
        })
      ).subscribe(recipes => {
        this.recipes = recipes
      })
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.recipeBookSubscription.unsubscribe();
  }
}
