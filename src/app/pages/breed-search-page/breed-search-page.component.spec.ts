import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedSearchPageComponent } from './breed-search-page.component';
import { DogApiService } from '../../services/dog-api.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dog-display',
  template: '<div></div>',
})
class MockDogDisplayComponent {
  @Input() images: string[] = [];
  @Input() breed: string = '';
  @Input() subBreed: string = '';
}

@Component({
  selector: 'app-breed-selector',
  template: '<div></div>',
})
class MockBreedSelectorComponent {
  @Input() breedSelected: any;
}

describe('BreedSearchPageComponent', () => {
  let component: BreedSearchPageComponent;
  let fixture: ComponentFixture<BreedSearchPageComponent>;
  let dogApiService: jest.Mocked<DogApiService>;

  beforeEach(async () => {
    dogApiService = {
      getBreeds: jest.fn().mockReturnValue(of({ message: { labrador: [], retriever: ['golden'] }, status: 'success' })),
      getBreedImages: jest.fn(),
      getSubBreedImages: jest.fn(),
      baseUrl: '',
      http: {} as any,
    } as Partial<jest.Mocked<DogApiService>> as jest.Mocked<DogApiService>;

    await TestBed.configureTestingModule({
      declarations: [BreedSearchPageComponent, MockDogDisplayComponent, MockBreedSelectorComponent],
      providers: [{ provide: DogApiService, useValue: dogApiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch images for a breed and update pagination', () => {
    const mockImages = ['dog1.jpg', 'dog2.jpg', 'dog3.jpg', 'dog4.jpg', 'dog5.jpg'];
    dogApiService.getBreedImages.mockReturnValue(of({ message: mockImages, status: 'success' }));

    component.onBreedSelected({ breed: 'labrador', subBreed: '' });

    expect(component.breed).toBe('labrador');
    expect(component.allImages).toEqual(mockImages);
    expect(component.currentPage).toBe(0);
    expect(component.pagedImages.length).toBeLessThanOrEqual(component.pageSize);
  });

  it('should fetch images for a sub-breed and update pagination', () => {
    const mockImages = ['subdog1.jpg', 'subdog2.jpg'];
    dogApiService.getSubBreedImages.mockReturnValue(of({ message: mockImages, status: 'success' }));

    component.onBreedSelected({ breed: 'retriever', subBreed: 'golden' });

    expect(component.breed).toBe('retriever');
    expect(component.subBreed).toBe('golden');
    expect(component.allImages).toEqual(mockImages);
    expect(component.currentPage).toBe(0);
    expect(component.pagedImages.length).toBeLessThanOrEqual(component.pageSize);
  });

  it('should clear images when no breed or sub-breed is selected', () => {
    component.onBreedSelected({ breed: '', subBreed: '' });

    expect(component.breed).toBe('');
    expect(component.subBreed).toBe('');
    expect(component.allImages).toEqual([]);
  });

  it('should update paged images when changing page', () => {
    component.allImages = Array.from({ length: 30 }, (_, i) => `dog${i + 1}.jpg`);
    component.pageSize = 10;
    component.currentPage = 0;
    component.updatePagedImages();

    expect(component.pagedImages.length).toBe(10);
    expect(component.pagedImages[0]).toBe('dog1.jpg');

    component.nextPage();
    expect(component.currentPage).toBe(1);
    expect(component.pagedImages[0]).toBe('dog11.jpg');

    component.prevPage();
    expect(component.currentPage).toBe(0);
    expect(component.pagedImages[0]).toBe('dog1.jpg');
  });

  it('should correctly calculate totalPages based on allImages length and pageSize', () => {
    component.allImages = Array.from({ length: 25 }, (_, i) => `dog${i + 1}.jpg`);
    component.pageSize = 10;

    expect(component.totalPages).toBe(3);

    component.allImages = Array.from({ length: 20 }, (_, i) => `dog${i + 1}.jpg`);
    expect(component.totalPages).toBe(2);

    component.allImages = Array.from({ length: 9 }, (_, i) => `dog${i + 1}.jpg`);
    expect(component.totalPages).toBe(1);
  });
});
