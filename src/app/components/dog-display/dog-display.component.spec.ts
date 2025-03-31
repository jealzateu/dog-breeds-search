import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogDisplayComponent } from './dog-display.component';

describe('DogDisplayComponent', () => {
  let component: DogDisplayComponent;
  let fixture: ComponentFixture<DogDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should assign breed input correctly', () => {
    component.breed = 'labrador';
    fixture.detectChanges();
    expect(component.breed).toBe('labrador');
  });

  it('should assign subBreed input correctly', () => {
    component.subBreed = 'golden';
    fixture.detectChanges();
    expect(component.subBreed).toBe('golden');
  });

  it('should assign images input correctly', () => {
    const testImages = ['https://example.com/dog1.jpg', 'https://example.com/dog2.jpg'];
    component.images = testImages;
    fixture.detectChanges();
    expect(component.images).toEqual(testImages);
  });
});