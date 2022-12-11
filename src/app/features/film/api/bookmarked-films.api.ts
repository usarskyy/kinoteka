import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsApi {

    private readonly data$ = new BehaviorSubject<BookmarkedMediaDictionary>({});

    public getAsDictionary(): Observable<BookmarkedMediaDictionary> {
        return of(this.data$.value)
          .pipe(
            delay(1000),
            tap((x) => {
              // @ts-ignore
              if (window['fail_getAsDictionary'] === true) {
                throw new Error('Service overloaded');
              }
            })
          );
    }

    public add(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        const newValue = {...this.data$.value};

        newValue[kinopoiskId] = newValue[kinopoiskId] ? [...newValue[kinopoiskId], bookmarkId] : [bookmarkId];

        this.data$.next(newValue);

        return of(true);
    }

    public remove(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        const newValue = {...this.data$.value};
        const existingVideoBookmarks = newValue[kinopoiskId] || [];

        if (existingVideoBookmarks) {
          newValue[kinopoiskId] = existingVideoBookmarks.filter(b => b != bookmarkId);
        }

        this.data$.next(newValue);

        return of(true);
    }
}
