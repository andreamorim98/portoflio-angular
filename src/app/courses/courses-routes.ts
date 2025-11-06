import { Routes } from '@angular/router';
import { NavigationPathsEnum } from './../shared/enums/navigation-paths.enum';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { CoursesComponent } from './courses.component';

export const coursesRoutes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: NavigationPathsEnum.NEW_COURSE,
    component: CoursesFormComponent,
  },
  {
    path: ':id',
    component: CoursesFormComponent,
  },
];
