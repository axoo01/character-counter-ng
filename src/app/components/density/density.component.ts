import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DensityItem {
  letter: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'cc-density',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './density.component.html',
  styleUrls: ['./density.component.scss']
})
export class DensityComponent {
 
  @Input() densityData: DensityItem[] = [];

  showAll: boolean = false;
  readonly PREVIEW_LIMIT = 5;

  get visibleItems(): DensityItem[] {
    return this.showAll ? this.densityData : this.densityData.slice(0, this.PREVIEW_LIMIT);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }
}