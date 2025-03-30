import { Component } from '@angular/core';
import { DogApiService } from '../../services/dog-api.service';

@Component({
  selector: 'app-breed-search-page',
  templateUrl: './breed-search-page.component.html',
  styleUrls: ['./breed-search-page.component.css'],
})
export class BreedSearchPageComponent {
  breed: string = '';
  subBreed: string = '';
  images: string[] = [];

  constructor(private readonly dogApiService: DogApiService) {}

  /**
   * Handles the selected breed and sub-breed, then fetches the corresponding images.
   * @param selection Object containing the breed and sub-breed.
   */
  onBreedSelected(selection: { breed: string; subBreed: string }): void {
    this.breed = selection.breed;
    this.subBreed = selection.subBreed;

    if (this.subBreed) {
      // Fetch images for a specific sub-breed
      this.dogApiService.getSubBreedImages(this.breed, this.subBreed).subscribe((data) => {
        this.images = data.message;
      });
    } else {
      // Fetch images for the main breed
      this.dogApiService.getBreedImages(this.breed).subscribe((data) => {
        this.images = data.message;
      });
    }
  }
}
