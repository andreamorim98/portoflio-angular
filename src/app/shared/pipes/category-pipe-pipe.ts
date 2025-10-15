import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe',
})
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
