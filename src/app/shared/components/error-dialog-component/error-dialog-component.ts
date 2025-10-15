import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog-component',
  imports: [MatDialogModule, MatButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 mat-dialog-title>Error!</h1>
    <div matDialogContent>
      <p>{{ data }}</p>
    </div>

    <div matDialogActions align="end">
      <button mat-button mat-dialog-close class="w-full sm:w-auto" matButton="elevated">
        Close
      </button>
    </div>
  `,
  styles: [``],
})
export class ErrorDialogComponent {
  public data: string = inject(MAT_DIALOG_DATA);
}
