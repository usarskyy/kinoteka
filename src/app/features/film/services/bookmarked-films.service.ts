import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkedFilmsStore } from '@features/film/stores/bookmarked-films.store';
import { Observable, of, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedFilmsApi } from '../api';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsService {

    constructor(
        private readonly bookmarkedFilmsApi: BookmarkedFilmsApi,
        private readonly bookmarkedFilmsStore: BookmarkedFilmsStore
    ) {
    }

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
      return this.bookmarkedFilmsApi
                 .getAsDictionary()
                 .pipe(
                   tap((data) => this.bookmarkedFilmsStore.update({bookmarks: data}))
                 );
    }

    public updateDictionaryIfAbsent(): Observable<BookmarkedMediaDictionary> {
        if (!this.bookmarkedFilmsStore.getValue().bookmarks) {
            return this.updateDictionary();
        }

        return of(this.bookmarkedFilmsStore.getValue().bookmarks || {});
    }

    public add(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
      debugger;
        return this.bookmarkedFilmsApi.add(kinopoiskId, bookmarkId)
            .pipe(
                tap(() => {

                  // TODO: partial state updates are supported BUT original implementation with 'null' is not
                  // compatible with the Akita way. Therefore a bit more code is required.

                  const allBookmarks = {...(this.bookmarkedFilmsStore.getValue().bookmarks || {})};

                  allBookmarks[kinopoiskId] = [...(allBookmarks[kinopoiskId] || []), bookmarkId];

                  this.bookmarkedFilmsStore.update({bookmarks: allBookmarks});
                })
            );
    }

    public remove(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
      debugger;
        return this.bookmarkedFilmsApi.remove(kinopoiskId, bookmarkId)
            .pipe(
                tap(() => {
                  // TODO: partial state updates are supported BUT original implementation with 'null' is not
                  // compatible with the Akita way. Therefore a bit more code is required.

                  const allBookmarks = {...(this.bookmarkedFilmsStore.getValue().bookmarks || {})};
                  const userBookmarks = allBookmarks[kinopoiskId];

                  if (userBookmarks) {
                    allBookmarks[kinopoiskId] = userBookmarks.filter(b => b !== bookmarkId);

                    this.bookmarkedFilmsStore.update({bookmarks: allBookmarks});
                  }

                })
            );
    }
}
