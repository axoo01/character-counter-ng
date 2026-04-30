import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cc-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  
  @Input() charCount: number = 0;
  @Input() wordCount: number = 0;
  @Input() sentenceCount: number = 0;
}