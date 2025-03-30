import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BreedSelectorComponent } from './components/breed-selector/breed-selector.component';
import { DogDisplayComponent } from './components/dog-display/dog-display.component';
import { BreedSearchPageComponent } from './pages/breed-search-page/breed-search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BreedSelectorComponent,
    DogDisplayComponent,
    BreedSearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
