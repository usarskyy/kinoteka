import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsApi {

    private readonly data$ = new BehaviorSubject<BookmarkedMediaDictionary>({});

    public getAsDictionary(): Observable<BookmarkedMediaDictionary> {
        return of(this.data$.value);
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
