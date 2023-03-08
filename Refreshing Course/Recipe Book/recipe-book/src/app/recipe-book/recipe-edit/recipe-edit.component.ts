import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  allowEdit: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((queryParams: Params) => {
      console.log('route params are -->', queryParams);
      this.allowEdit = queryParams['recipeId'] !== undefined ? true : false;
      console.log('allowEdit -->', this.allowEdit);
    })
  }
}
