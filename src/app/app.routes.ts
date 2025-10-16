import { Routes } from '@angular/router';
import { NavigationPathsEnum } from './shared/enums/navigation-paths.enum';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: NavigationPathsEnum.COURSES,
  },
  {
    path: NavigationPathsEnum.COURSES,
    loadChildren: () => import('./courses/courses-routes').then((route) => route.coursesRoutes),
  },
];
