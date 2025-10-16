import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CourseInterface } from '../models/course.interface';

@Injectable()
export class CoursesHttpService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = `${environment.apiUrl}courses`;

  public list(): Observable<CourseInterface[]> {
    return this.httpClient.get<CourseInterface[]>(this.apiUrl);
  }

  public create(course: CourseInterface): Observable<CourseInterface> {
    return this.httpClient.post<CourseInterface>(this.apiUrl, course);
  }
}
