import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  get(chave: string): any {
    return localStorage.getItem(chave);
  }

  set(chave: string, valor: any): void {
    localStorage.setItem(chave, valor);
  }

  getAsObject(valor: string): any {
    return JSON.parse(this.get(valor));
  }

  setFromObject(chave: string, valor: any): void {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  del(chave: string): void {
    localStorage.removeItem(chave);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
