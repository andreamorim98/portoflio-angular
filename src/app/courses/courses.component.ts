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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal.component/confirmation-modal.component';
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
  private readonly snackBar = inject(MatSnackBar);

  loading: WritableSignal<boolean> = signal(false);
  courses: WritableSignal<CourseInterface[]> = signal([]);
  displayedColumns: Signal<string[]> = signal(['name', 'category', 'actions']);

  ngOnInit(): void {
    this.getCoursesList();
  }

  public add(): void {
    this.navigationService.navigateTo([
      `${NavigationPathsEnum.COURSES}/${NavigationPathsEnum.NEW_COURSE}`,
    ]);
  }

  public edit(courseId: string): void {
    this.navigationService.navigateTo([`${NavigationPathsEnum.COURSES}/${courseId}`]);
  }

  public openConfirmationDeleteDialog(courseId: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: 'Are you sure you want to delete this course?',
    });

    dialogRef.componentInstance.confirm.subscribe((confirmed) => {
      if (confirmed) this.delete(courseId);
    });
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

  private delete(courseId: string): void {
    this.coursesService.delete(courseId).subscribe({
      next: () => {
        this.getCoursesList();
        this.snackBar.open('Course deleted successfully!', '', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this.openErrorDialog(error?.message ?? 'An issue happened while deleting the course');
      },
    });
  }
}
