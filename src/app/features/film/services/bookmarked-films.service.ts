import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedFilmsApi } from '../api';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsService {

    private readonly state$ = new BehaviorSubject<BookmarkedMediaDictionary | null>(null);

    ////// NOT REQUIRED, ADDED FOR BACKWARD COMPATIBILITY -> START ->
    public readonly data$ = this.state$.asObservable();

    public get data() {
      return this.state$.value;
    };
    ////// -> END

    constructor(
        private readonly bookmarkedFilmsApi: BookmarkedFilmsApi
    ) {}

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
        return this.bookmarkedFilmsApi.getAsDictionary()
            .pipe(
                tap(() => console.log('LOADING DATA...')),
                delay(1000),
                tap((data) => this.state$.next(data))
            );
    }

    public updateDictionaryIfAbsent(): Observable<BookmarkedMediaDictionary> {
        if (!this.state$.value) {
            return this.updateDictionary();
        }

        return this.data$ as Observable<BookmarkedMediaDictionary>;
    }

    public add(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedFilmsApi.add(kinopoiskId, bookmarkId)
            .pipe(
                tap(() => {
                  let bookmarks = this.state$.value?.[kinopoiskId] || [];

                  bookmarks = [...bookmarks, bookmarkId];

                  const newState = {...this.state$.value, ...{ [kinopoiskId]: bookmarks }};

                  this.state$.next(newState);
                })
            );
    }

    public remove(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
        return this.bookmarkedFilmsApi.remove(kinopoiskId, bookmarkId)
            .pipe(
                tap(() => {
                  let bookmarks = this.state$.value?.[kinopoiskId] || [];

                  bookmarks = bookmarks.filter((currBookmark) => (currBookmark !== bookmarkId));

                  const newState = {...this.state$.value, ...{ [kinopoiskId]: bookmarks }};

                  this.state$.next(newState);
                })
            );
    }
}
