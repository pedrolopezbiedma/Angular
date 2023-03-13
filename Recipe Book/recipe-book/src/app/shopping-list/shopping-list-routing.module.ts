// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components, Services & Models
import { AuthGuard } from '../authentication/authentication/auth.guard';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule { }
