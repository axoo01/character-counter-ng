import { Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'cc-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('character-counter-theme') || 'dark';
    this.applyTheme(savedTheme === 'light');
  }

  onThemeChange(isLight: boolean): void {
    this.applyTheme(isLight);
  }

  private applyTheme(isLight: boolean): void {
    const theme = isLight ? 'light' : 'dark';
    
    if (isLight) {
      this.renderer.removeClass(document.body, 'dark');
    } else {
      this.renderer.addClass(document.body, 'dark');
    }
    
    localStorage.setItem('character-counter-theme', theme);
  }
}