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

  public getCurrentRoute(): string {
    return this.router.url;
  }

  public getQueryParam(param: string): string {
    return this.activatedRoute.snapshot.queryParams[param];
  }

  public getParam(param: string): string | null {
    return this.getDeepestRoute().snapshot.paramMap.get(param);
  }

  // Helper: returns the deepest ActivatedRoute (current active route)
  private getDeepestRoute(): ActivatedRoute {
    let route: ActivatedRoute = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
