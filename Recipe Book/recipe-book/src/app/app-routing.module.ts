// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components, Services & Models
import { AuthenticationComponent } from './authentication/authentication/authentication.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-book', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
