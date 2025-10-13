import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { CourseInterface } from '../models/course.interface';

@Injectable()
export class CoursesService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public list(): Observable<CourseInterface[]> {
    return this.httpClient.get<CourseInterface[]>('/assets/courses.json').pipe(
      first(),
      tap((courses) => console.log(courses))
    );
  }
}
