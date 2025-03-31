import { TestBed } from '@angular/core/testing';
import { DogApiService } from './dog-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DogApiService', () => {
  let service: DogApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://dog.ceo/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogApiService],
    });

    service = TestBed.inject(DogApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all breeds', () => {
    const mockResponse = {
      message: { bulldog: ['french', 'english'], retriever: ['golden', 'labrador'] },
      status: 'success',
    };

    service.getBreeds().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/breeds/list/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch breed images', () => {
    const breed = 'retriever';
    const mockResponse = {
      message: ['image1.jpg', 'image2.jpg'],
      status: 'success',
    };

    service.getBreedImages(breed).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/breed/${breed}/images`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch sub-breed images', () => {
    const breed = 'bulldog';
    const subBreed = 'french';
    const mockResponse = {
      message: ['image1.jpg', 'image2.jpg'],
      status: 'success',
    };

    service.getSubBreedImages(breed, subBreed).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/breed/${breed}/${subBreed}/images`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
