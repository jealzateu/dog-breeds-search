import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedSearchPageComponent } from './pages/breed-search-page/breed-search-page.component';

const routes: Routes = [
  { path: '', component: BreedSearchPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
