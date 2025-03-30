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
  allImages: string[] = [];
  pagedImages: string[] = [];
  currentPage: number = 0;
  pageSize: number = 15;

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
        this.allImages = data.message;
        this.currentPage = 0;
        this.updatePagedImages();
      });
    } else {
      // Fetch images for the main breed
      this.dogApiService.getBreedImages(this.breed).subscribe((data) => {
        this.allImages = data.message;
        this.currentPage = 0;
        this.updatePagedImages();
      });
    }
  }

  /**
   * Updates the images displayed on the current page.
   */
  updatePagedImages(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedImages = this.allImages.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Navigates to the previous page.
   */
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedImages();
    }
  }

  /**
   * Navigates to the next page.
   */
  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.allImages.length) {
      this.currentPage++;
      this.updatePagedImages();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.allImages.length / this.pageSize);
  }
  
}
