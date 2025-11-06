import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatSnackBarModule,
  ],
  providers: [CoursesHttpService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-form.component.html',
  styles: [``],
})
export class CoursesFormComponent extends ScreenSizeBase implements OnInit {
  private readonly nonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly courseHttpService = inject(CoursesHttpService);
  private readonly navigationService = inject(NavigationService);
  private readonly snackBar = inject(MatSnackBar);

  public form: FormGroup = this.nonNullableFormBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });
  public courseId: string | null = this.navigationService.getParam('id');

  ngOnInit(): void {
    this.retrieveCourseData();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    if (this.courseId) {
      this.updateCourse();
    } else {
      this.createCourse();
    }
  }

  public onCancel(): void {
    console.log('Cancelled course creation');
    this.navigationService.navigateTo([NavigationPathsEnum.COURSES]);
  }

  private retrieveCourseData(): void {
    if (!this.courseId) return;

    this.courseHttpService.findById(this.courseId).subscribe({
      next: (course) => this.form.patchValue(course),
      error: (error) => {
        this.snackBar.open('Error while fetching course data. Please try again later.', '', {
          duration: 3000,
        });
        console.error(error);
      },
    });
  }

  private createCourse(): void {
    this.courseHttpService.create(this.form.value).subscribe({
      next: (course) => {
        console.log('New course created: ', course);
        this.snackBar.open('Course created successfully!', '', { duration: 3000 });
        this.navigationService.navigateTo([NavigationPathsEnum.COURSES]);
      },
      error: (error) => {
        this.snackBar.open('Error while creating course. Please try again later.', '', {
          duration: 3000,
        });
        console.error(error);
      },
    });
  }

  private updateCourse(): void {
    if (!this.courseId) return;

    this.courseHttpService.update(this.courseId, this.form.value).subscribe({
      next: (course) => {
        console.log('Updated course: ', course);
        this.snackBar.open('Course updated successfully!', '', { duration: 3000 });
        this.navigationService.navigateTo([NavigationPathsEnum.COURSES]);
      },
      error: (error) => {
        this.snackBar.open('Error while updating course. Please try again later.', '', {
          duration: 3000,
        });
        console.error(error);
      },
    });
  }
}
