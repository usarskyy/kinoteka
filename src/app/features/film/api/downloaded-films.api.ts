import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { DownloadedFilm } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DownloadedFilmsApi {

    private readonly data$ = new BehaviorSubject<DownloadedFilm[]>([
                                                                     {
                                                                       title: 'Parrots',
                                                                       media: {
                                                                         id: 1,
                                                                         duration: 100,
                                                                         maxQuality: 720,
                                                                         translationId: 1,
                                                                         translationName: 'TODO'
                                                                       },
                                                                       kinopoiskId: '6789',
                                                                       year: '2022'
                                                                     }
                                                                   ]);

    constructor(
        private readonly apiService: ApiService
    ) {}

    public get(kinopoiskId: string): Observable<DownloadedFilm> {
        const films = this.data$.value.filter(f => f.kinopoiskId === kinopoiskId);

        if (films.length === 0) {
          return EMPTY;
        }

        return of(films[0]);
    }

    public getMediaUrl(kinopoiskId: string): string {
        return `${this.apiService.hostUrl}/downloaded-films/${kinopoiskId}/media`;
    }

    public getAll(): Observable<DownloadedFilm[]> {
        return this.data$;
    }

    public delete(kinopoiskId: string): Observable<unknown> {
        const newState = this.data$.value.filter(f => f.kinopoiskId !== kinopoiskId);

        this.data$.next(newState);

        return of(true);
    }
}
