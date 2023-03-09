// Angular
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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

    if(this.editMode) {
     let recipe =  this.recipesService.getRecipe(this.recipeId);
     recipeName = recipe.name;
     recipeDescription = recipe.description;
     recipeImagePath = recipe.imagePath;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm.value)
  }
}
