import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ScreenSizeBase } from '../../base/screen-size.base';

@Component({
  selector: 'app-confirmation-modal.component',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div matDialogContent>
      <p>{{ data }}</p>
    </div>

    <div
      matDialogActions
      class="flex"
      [ngClass]="{ 'flex-col': isMobile(), 'flex-row justify-end': isDesktop() || isTablet() }"
    >
      <button
        [ngClass]="{ 'w-full mb-[16px]': isMobile(), ' mr-[16px]': isTablet() || isDesktop() }"
        matButton="outlined"
        matTooltip="Cancel course creation"
        type="button"
        mat-dialog-close
        (click)="confirm.emit(false)"
      >
        No
      </button>

      <button
        [ngClass]="{ 'w-full': isMobile(), ' mr-[16px]': isTablet() || isDesktop() }"
        mat-raised-button
        color="primary"
        type="button"
        mat-dialog-close
        (click)="confirm.emit(true)"
      >
        Yes
      </button>
    </div>
  `,
})
export class ConfirmationModalComponent extends ScreenSizeBase {
  public data: string = inject(MAT_DIALOG_DATA);

  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
}
