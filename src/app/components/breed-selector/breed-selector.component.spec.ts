import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedSelectorComponent } from './breed-selector.component';
import { DogApiService } from '../../services/dog-api.service';
import { of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

describe('BreedSelectorComponent', () => {
  let component: BreedSelectorComponent;
  let fixture: ComponentFixture<BreedSelectorComponent>;
  let dogApiServiceMock: Partial<DogApiService>;

  beforeEach(async () => {
    dogApiServiceMock = {
      getBreeds: jest.fn().mockReturnValue(
        of({
          message: {
            labrador: ['retriever'],
            bulldog: ['english', 'french'],
          },
          status: 'success',
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [BreedSelectorComponent],
      providers: [{ provide: DogApiService, useValue: dogApiServiceMock }],
      imports: [MatSelectModule, MatFormFieldModule, MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load breeds on init', () => {
    expect(component.breeds.length).toBeGreaterThan(0);
    expect(component.breeds).toContain('labrador');
    expect(component.breeds).toContain('bulldog');
  });

  it('should update subBreeds when a breed is selected', () => {
    component.onBreedChange('bulldog');
    expect(component.subBreeds).toEqual(['english', 'french']);
  });

  it('should set subBreeds to an empty array if breed has no sub-breeds', () => {
    component.onBreedChange('');
    expect(component.subBreeds).toEqual([]);
  });

  it('should emit breedSelected event when searching', () => {
    jest.spyOn(component.breedSelected, 'emit');

    component.selectedBreed = 'bulldog';
    component.selectedSubBreed = 'english';
    component.onSearch();

    expect(component.breedSelected.emit).toHaveBeenCalledWith({
      breed: 'bulldog',
      subBreed: 'english',
    });
  });

  it('should reset selectedBreed, selectedSubBreed, and subBreeds when onClear() is called', () => {
    jest.spyOn(component.breedSelected, 'emit');

    component.selectedBreed = 'bulldog';
    component.selectedSubBreed = 'english';
    component.subBreeds = ['english', 'french'];

    component.onClear();

    expect(component.selectedBreed).toBe('');
    expect(component.selectedSubBreed).toBe('');
    expect(component.subBreeds).toEqual([]);

    expect(component.breedSelected.emit).toHaveBeenCalledWith({
      breed: '',
      subBreed: '',
    });
  });
});
