import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs';
import { ErrorDialogComponent } from '../shared/components/error-dialog-component/error-dialog-component';
import { NavigationPathsEnum } from '../shared/enums/navigation-paths.enum';
import { CategoryPipe } from '../shared/pipes/category-pipe-pipe';
import { NavigationService } from '../shared/services/navigation.service';
import { CourseInterface } from './models/course.interface';
import { CoursesHttpService } from './services/courses-http.service';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CategoryPipe,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [CoursesHttpService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
  private readonly coursesService: CoursesHttpService = inject(CoursesHttpService);
  private readonly dialog = inject(MatDialog);
  private readonly navigationService = inject(NavigationService);

  loading: WritableSignal<boolean> = signal(false);
  courses: WritableSignal<CourseInterface[]> = signal([]);
  displayedColumns: Signal<string[]> = signal(['name', 'category', 'actions']);

  ngOnInit(): void {
    this.getCoursesList();
  }

  public addCourse(): void {
    this.navigationService.navigateTo([
      `${NavigationPathsEnum.COURSES}/${NavigationPathsEnum.NEW_COURSE}`,
    ]);
  }

  private getCoursesList(): void {
    this.loading.set(true);
    this.coursesService
      .list()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (courses) => {
          this.courses.set(courses);
        },
        error: (error) => {
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
