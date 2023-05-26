import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObsDefinitionComponent } from './components/Basic/obs-definition/obs-definition.component';
import { SubjectDefinitionComponent } from './components/Basic/subject-definition/subject-definition.component';

@NgModule({
  declarations: [AppComponent, ObsDefinitionComponent, SubjectDefinitionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
