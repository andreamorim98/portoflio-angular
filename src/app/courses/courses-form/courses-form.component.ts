import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { ScreenSizeBase } from '../../shared/base/screen-size.base';
import { NavigationPathsEnum } from '../../shared/enums/navigation-paths.enum';
import { NavigationService } from '../../shared/services/navigation.service';
import { CoursesHttpService } from '../services/courses-http.service';

@Component({
  selector: 'app-courses-form.component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCard,
    HttpClientModule,
    MatButtonModule,
    MatTooltip,
    MatSelectModule,
    CommonModule,
  ],
  providers: [CoursesHttpService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-form.component.html',
  styles: [``],
})
export class CoursesFormComponent extends ScreenSizeBase {
  private readonly formBuilder = inject(FormBuilder);
  private readonly courseHttpService = inject(CoursesHttpService);
  private readonly navigationService = inject(NavigationService);

  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  public onSubmit(): void {
    if (this.form.invalid) return;

    this.courseHttpService.create(this.form.value).subscribe({
      next: (course) => {
        console.log('New course created: ', course);
        this.navigationService.navigateTo([NavigationPathsEnum.COURSES]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public onCancel(): void {
    console.log('Cancelled course creation');
    this.navigationService.navigateTo([NavigationPathsEnum.COURSES]);
  }
}
