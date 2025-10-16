import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { NavigationPathsEnum } from './shared/enums/navigation-paths.enum';
import { NavigationService } from './shared/services/navigation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly _navigationService = inject(NavigationService);

  public readonly title: string = environment.appName;

  public onBack(): void {
    this._navigationService.navigateTo(['']);
  }

  public isDisplayBackButton(): boolean {
    return this._navigationService.getCurrentRoute() !== `/${NavigationPathsEnum.COURSES}`;
  }
}
