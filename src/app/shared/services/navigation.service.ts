import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationPathsEnum } from '../enums/navigation-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public navigateTo(path: NavigationPathsEnum[] | string[]): void {
    this.router.navigate(path, { relativeTo: this.activatedRoute });
  }

  public getCurrentRoute(): ActivatedRoute {
    return this.activatedRoute;
  }
}
