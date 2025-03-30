import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogApiService {
  private readonly baseUrl = 'https://dog.ceo/api';

  constructor(private readonly http: HttpClient) {}

  /** Get the list of all breeds */
  getBreeds(): Observable<{ message: Record<string, string[]>; status: string }> {
    return this.http.get<{ message: Record<string, string[]>; status: string }>(
      `${this.baseUrl}/breeds/list/all`
    );
  }

  /** Get all images of a specific breed */
  getBreedImages(breed: string): Observable<{ message: string[]; status: string }> {
    return this.http.get<{ message: string[]; status: string }>(
      `${this.baseUrl}/breed/${breed}/images`
    );
  }

  /** Get all images of a specific sub-breed */
  getSubBreedImages(breed: string, subBreed: string): Observable<{ message: string[]; status: string }> {
    return this.http.get<{ message: string[]; status: string }>(
      `${this.baseUrl}/breed/${breed}/${subBreed}/images`
    );
  }
}
