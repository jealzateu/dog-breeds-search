import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dog-display',
  templateUrl: './dog-display.component.html',
  styleUrls: ['./dog-display.component.css'],
})
export class DogDisplayComponent {
  @Input() images: string[] = [];
  @Input() breed: string = '';
  @Input() subBreed: string = '';
}
