import { Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StatsComponent } from './components/stats/stats.component';
import { DensityComponent } from './components/density/density.component'; // New Import
import { TextAnalysisService } from './services/text-analysis.service';

@Component({
  selector: 'cc-root',
  standalone: true,
  imports: [HeaderComponent, TextInputComponent, StatsComponent, DensityComponent], // Added Density
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentText: string = '';
  readingTime: string = 'Approx. reading time: 0 minutes';
  excludeSpaces: boolean = false;
  
  // Stats & Density State
  charCount: number = 0;
  wordCount: number = 0;
  sentenceCount: number = 0;
  densityData: any[] = [];

  constructor(
    private renderer: Renderer2,
    private analysisService: TextAnalysisService
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('character-counter-theme') || 'dark';
    this.applyTheme(savedTheme === 'light');
  }

  handleTextChange(text: string): void {
    this.currentText = text;
    this.updateAnalysis();
  }

  handleConfigChange(config: { excludeSpaces: boolean, charLimit: number | null }): void {
    this.excludeSpaces = config.excludeSpaces;
    this.updateAnalysis();
  }

  private updateAnalysis(): void {
    this.charCount = this.analysisService.countCharacters(this.currentText, this.excludeSpaces);
    this.wordCount = this.analysisService.countWords(this.currentText);
    this.sentenceCount = this.analysisService.countSentences(this.currentText);
    this.readingTime = this.analysisService.getReadingTime(this.wordCount);
    this.densityData = this.analysisService.getLetterDensity(this.currentText);
  }

  onThemeChange(isLight: boolean): void {
    this.applyTheme(isLight);
  }

  private applyTheme(isLight: boolean): void {
    if (isLight) {
      this.renderer.removeClass(document.body, 'dark');
    } else {
      this.renderer.addClass(document.body, 'dark');
    }
    localStorage.setItem('character-counter-theme', isLight ? 'light' : 'dark');
  }
}