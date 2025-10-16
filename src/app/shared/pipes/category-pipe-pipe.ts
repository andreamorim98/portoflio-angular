import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe',
})
/**
 * A pipe that transforms a course category into a corresponding icon name.
 * - 'front-end' maps to 'code'
 * - 'back-end' maps to 'computer'
 * - any other value defaults to 'code'
 */
export class CategoryPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'front-end':
      default:
        return 'code';
      case 'back-end':
        return 'computer';
    }
  }
}
