import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DogApiService } from '../../services/dog-api.service';

@Component({
  selector: 'app-breed-selector',
  templateUrl: './breed-selector.component.html',
  styleUrls: ['./breed-selector.component.css'],
})
export class BreedSelectorComponent implements OnInit {
  breedsData: Record<string, string[]> = {};
  breeds: string[] = [];
  subBreeds: string[] = [];
  selectedBreed: string = '';
  selectedSubBreed: string = '';

  @Output() breedSelected = new EventEmitter<{ breed: string; subBreed: string }>();

  constructor(private readonly dogApiService: DogApiService) {}

  ngOnInit(): void {
    this.loadBreeds();
  }

  /**
   * Loads all available breeds and their sub-breeds.
   */
  loadBreeds(): void {
    this.dogApiService.getBreeds().subscribe((data) => {
      this.breedsData = data.message;
      this.breeds = Object.keys(this.breedsData);
    });
  }

  /**
   * Updates the list of sub-breeds based on the selected breed.
   * @param breed The selected breed.
   */
  onBreedChange(breed: string): void {
    this.selectedBreed = breed;
    this.selectedSubBreed = '';
    this.subBreeds = this.breedsData[breed] || [];
  }

  /**
   * Emits the selected breed and sub-breed (if any).
   */
  onSearch(): void {
    this.breedSelected.emit({ breed: this.selectedBreed, subBreed: this.selectedSubBreed });
  }

  /**
   * Clears the selected breed and sub-breed.
   */
  onClear(): void {
    this.selectedBreed = '';
    this.selectedSubBreed = '';
    this.subBreeds = [];
    this.breedSelected.emit({ breed: this.selectedBreed, subBreed: this.selectedSubBreed });
  }
}
