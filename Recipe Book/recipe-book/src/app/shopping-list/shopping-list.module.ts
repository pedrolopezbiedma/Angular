// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Other Modules
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components, Services & Models
import { NewIngredientComponent } from './new-ingredient/new-ingredient.component';
import { ShoppingListComponent } from './shopping-list.component';


@NgModule({
  declarations: [
    ShoppingListComponent,
    NewIngredientComponent,
  ],
  imports: [
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [],
})
export class ShoppingListModule { }
