// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components, Services & Models
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { AuthGuard } from './authentication/authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
  { path: 'authentication', component: AuthenticationComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
