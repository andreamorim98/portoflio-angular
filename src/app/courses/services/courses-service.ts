import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CourseInterface } from '../models/course.interface';

@Injectable()
export class CoursesService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = `${environment.apiUrl}courses`;

  public list(): Observable<CourseInterface[]> {
    return this.httpClient.get<CourseInterface[]>(this.apiUrl);
  }
}
