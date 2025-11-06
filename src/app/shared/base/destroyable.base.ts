import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable()
export abstract class DestroyableBase implements OnDestroy {
  private readonly unsubscribe$$: Subject<void> = new Subject<void>();
  protected readonly unsubscribe$: Observable<void> = this.unsubscribe$$.asObservable();

  protected readonly subscriptions: Subscription[] = [];
  protected interval: number = 0;

  protected unsubscribeAll(clean = false): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());

    if (clean) {
      this.subscriptions.length = 0;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
    this.unsubscribeAll();
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }
}
