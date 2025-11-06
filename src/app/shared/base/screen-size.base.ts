import { Injectable, signal, WritableSignal } from '@angular/core';
import { debounceTime, fromEvent, takeUntil } from 'rxjs';
import { DestroyableBase } from './destroyable.base';

@Injectable()
export abstract class ScreenSizeBase extends DestroyableBase {
  private mobileBreakpoint: number;
  private tabletBreakpoint: number;
  private desktopBreakpoint: number;

  readonly isMobile: WritableSignal<boolean | null> = signal(null);
  readonly isTablet: WritableSignal<boolean | null> = signal(null);
  readonly isDesktop: WritableSignal<boolean | null> = signal(null);

  constructor() {
    super();
    this.mobileBreakpoint = 768;
    this.tabletBreakpoint = 1024;
    this.desktopBreakpoint = 1440;

    this.checkDevice();

    // Listen to window resize events
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe$), debounceTime(100))
      .subscribe(() => {
        this.checkDevice();
        // this.onScreenSizeChange();
      });
  }

  // Method to check and update device type based on window width
  private checkDevice(): void {
    if (window.innerWidth < this.mobileBreakpoint) {
      this.isMobile.set(true);
      this.isTablet.set(false);
      this.isDesktop.set(false);
    } else if (window.innerWidth < this.tabletBreakpoint) {
      this.isMobile.set(false);
      this.isTablet.set(true);
      this.isDesktop.set(false);
    } else {
      this.isMobile.set(false);
      this.isTablet.set(false);
      this.isDesktop.set(true);
    }
  }

  // Method to be implemented by subclasses to handle screen size changes
  // protected abstract onScreenSizeChange(): void;
}
