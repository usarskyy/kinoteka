import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedTvSeriesesApi {

    private readonly data$ = new BehaviorSubject<BookmarkedMediaDictionary>({});

    public getAsDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.data$;
    }

    public add(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {

        const newValue = {...this.data$.value};

        newValue[videoId] = newValue[videoId] ? [...newValue[videoId], bookmarkId] : [bookmarkId];

        this.data$.next(newValue);

        return of(true);
    }

    public remove(videoId: string, bookmarkId: BookmarkEnum): Observable<unknown> {

        const newValue = {...this.data$.value};
        const existingVideoBookmarks = newValue[videoId] || [];

        if (existingVideoBookmarks) {
          newValue[videoId] = existingVideoBookmarks.filter(b => b != bookmarkId);
        }

        this.data$.next(newValue);

        return of(true);
    }
}
