// Angular
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';

// Components, Services & Models
import { RecipesService } from 'src/app/shared/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  recipeId: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit() {
    this.route.params.subscribe((queryParams: Params) => {
      this.recipeId = queryParams['recipeId'];
      this.editMode = this.recipeId !== undefined ? true : false;
      this.initializeForm();
    })
  }

  initializeForm(){
    let recipeName;
    let recipeDescription;
    let recipeImagePath;
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
     let recipe =  this.recipesService.getRecipe(this.recipeId);
     recipeName = recipe.name;
     recipeDescription = recipe.description;
     recipeImagePath = recipe.imagePath;

     if(recipe.ingredients.length > 0){
      recipe.ingredients.forEach((ingredient: Ingredient) => {
        let formGroup = new FormGroup({
          'name': new FormControl(ingredient.name),
          'amount': new FormControl(ingredient.amount)
        })
        recipeIngredients.push(formGroup);
      });
     }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients':recipeIngredients
    });
  }

  onAddIngredientToRecipeForm(): void {
    this.controls.push(
      new FormGroup({
        'name': new FormControl(null),
        'amount': new FormControl(null)
      })
    )
  }

  onSubmit(): void {
    console.log(this.recipeForm.value)
  }
}
