
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css'
})
export class InicioAdmin implements AfterViewInit {

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  currentSlide: number = 0;
  slideDistance: number = 0;

  get visibleCards(): number {
    return window.innerWidth <= 650 ? 1 : 2;
  }

  get indicators(): number[] {
    const totalCards = 4;
    const totalSlides = totalCards - this.visibleCards + 1;

    return Array.from({ length: totalSlides }, (_, i) => i);
  }

  get trackTransform(): string {
    return `translateX(-${this.currentSlide * this.slideDistance}px)`;
  }

  ngAfterViewInit(): void {
    this.updateSlideDistance();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSlideDistance();

    if (this.currentSlide >= this.indicators.length) {
      this.currentSlide = this.indicators.length - 1;
    }
  }

  updateSlideDistance(): void {
    const track = this.carouselTrack.nativeElement;
    const firstCard = track.children[0];

    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;

      this.slideDistance = cardWidth + gap;
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.indicators.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.indicators.length - 1;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
