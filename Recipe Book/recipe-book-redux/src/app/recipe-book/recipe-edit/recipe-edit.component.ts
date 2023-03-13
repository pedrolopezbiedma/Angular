// Angular
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

// Components, Services & Models
import { RecipesService } from 'src/app/recipe-book/recipes.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from '../recipe.model';

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
    private router: Router,
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
          'name': new FormControl(ingredient.name, [Validators.required]),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(0)])
        })
        recipeIngredients.push(formGroup);
      });
     }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,[Validators.required]),
      'imagePath': new FormControl(recipeImagePath,[Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients':recipeIngredients
    });
  }

  onAddIngredientToRecipeForm(): void {
    this.controls.push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.min(0)])
      })
    )
  }

  onRemoveIngredientFromRecipeForm(index: number): void{
    this.controls.splice(index, 1);
  }

  onSubmit(): void {
    console.log(this.recipeForm.value)

    let updatedIngredients: Ingredient[] = [];
    this.controls.forEach(control => {
      updatedIngredients.push(new Ingredient(Math.floor(Math.random() * 1000), control.get('name').value, control.get('amount').value));
    })

    if(this.editMode){
      this.recipesService.editRecipe({
        recipeId: +this.recipeId,
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.description,
        imagePath: this.recipeForm.value.imagePath,
        ingredients: updatedIngredients,
      })
    } else {
      this.recipesService.addRecipe(
          new Recipe(
            Math.floor(Math.random() * 1000),
            this.recipeForm.value.name,
            this.recipeForm.value.description,
            this.recipeForm.value.imagePath,
            updatedIngredients
          )
      )
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
