import { Component, EventEmitter, Output, Input, output } from '@angular/core'; // Add Input here
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cc-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
 
  @Input() readingTime: string = 'Approx. reading time: 0 minutes';

  @Output() textChanged = new EventEmitter<string>();
  @Output() configChanged = new EventEmitter<{ excludeSpaces: boolean, charLimit: number | null }>();

  text: string = '';
  excludeSpaces: boolean = false;
  setLimit: boolean = false;
  charLimit: number | null = null;

  onInputChange() {
    this.textChanged.emit(this.text);
  }

  emitConfig() {
    this.configChanged.emit({
      excludeSpaces: this.excludeSpaces,
      charLimit: this.setLimit ? this.charLimit : null
    });
  }
}