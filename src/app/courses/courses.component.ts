import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { finalize } from 'rxjs';
import { ErrorDialogComponent } from '../shared/components/error-dialog-component/error-dialog-component';
import { CourseInterface } from './models/course.interface';
import { CoursesService } from './services/courses-service';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [CoursesService, HttpClient],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
  private readonly coursesService: CoursesService = inject(CoursesService);
  private readonly dialog = inject(MatDialog);

  loading: WritableSignal<boolean> = signal(false);
  courses: WritableSignal<CourseInterface[]> = signal([]);
  displayedColumns: Signal<string[]> = signal(['name', 'category']);

  ngOnInit(): void {
    this.getCoursesList();
  }

  private getCoursesList(): void {
    this.loading.set(true);
    this.coursesService
      .list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (courses) => {
          // this.loading.set(false);
          this.courses.set(courses);
        },
        error: (error) => {
          // this.loading.set(false);
          console.error(error);
          this.openErrorDialog(error?.message ?? 'An issue happened retrieving the courses list');
        },
      });
  }

  private openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }
}
