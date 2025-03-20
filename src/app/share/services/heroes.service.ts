import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = 'http://localhost:3000/heroes';
  private heroesSubject = new BehaviorSubject<any[]>([])
  public heroes = this.heroesSubject.asObservable();

  private allHeroes: any[] = [];
  private currentPage = 0;
  private pageSize = 12;

  private snackBar = inject(MatSnackBar);

  constructor(public http: HttpClient) { }

  loadHeroes() {
    this.http.get<any[]>(this.apiUrl).pipe(
    ).subscribe(heroes => {
      this.allHeroes = heroes.reverse();
      this.currentPage = 0;
      this.loadMoreHeroes();
    });
  }

  loadMoreHeroes() {
    const nextPageHeroes = this.allHeroes.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );

    if (nextPageHeroes.length > 0) {
      this.currentPage++;
      this.heroesSubject.next([...this.heroesSubject.value, ...nextPageHeroes]);
    }
  }

  getTotalHeroes(): number {
    return this.allHeroes.length;
  }

  saveHero(hero: any, file: File | null): Observable<any> {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Observable(observer => {
        reader.onload = () => {
          hero.image = reader.result;
          this.http.post(this.apiUrl, hero).subscribe(response => {
            this.allHeroes.unshift(response);
            this.heroesSubject.next([...this.allHeroes]);
            this.showSnackbar('Héroe creado correctamente');
            observer.next(response);
            observer.complete();
          });
        };
        reader.onerror = error => observer.error(error);
      });
    } else {
      return this.http.post(this.apiUrl, hero).pipe(
        tap(response => {
          this.allHeroes.unshift(response);
          this.heroesSubject.next([...this.allHeroes]);
          this.showSnackbar('Héroe creado correctamente');
        })
      );
    }
  }

  deleteHero(heroId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${heroId}`).pipe(
      tap(() => {
        this.allHeroes = this.allHeroes.filter(hero => hero.id !== heroId);
        this.heroesSubject.next([...this.allHeroes]);
        this.showSnackbar('Este héroe se ha eliminado');
      })
    );
  }

  private showSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  fetchUpdatedHeroes() {
    this.http.get<any[]>(this.apiUrl).subscribe(updatedHeroes => {
      this.allHeroes = updatedHeroes.reverse();
      this.heroesSubject.next(this.allHeroes);
    });
  }
}
