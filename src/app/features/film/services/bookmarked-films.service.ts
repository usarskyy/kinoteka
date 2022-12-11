import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { bookmarkAddedAction, bookmarkRemovedAction, bookmarksLoadedAction } from '@features/film/stores/bookmarked-films.actions';
import { selectAllBookmarks, selectAllBookmarksNotNull } from '@features/film/stores/bookmarked-films.selectors';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';
import { BookmarkedFilmsApi } from '../api';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsService {

    constructor(
        private readonly bookmarkedFilmsApi: BookmarkedFilmsApi,
        private readonly store: Store,
    ) {
    }

    public updateDictionary(): Observable<BookmarkedMediaDictionary> {
      return this.bookmarkedFilmsApi
                 .getAsDictionary()
                 .pipe(
                   tap((data) => this.store.dispatch(bookmarksLoadedAction(data)))
                 );
    }

    public updateDictionaryIfAbsent(): Observable<BookmarkedMediaDictionary> {
        // A small bonus from NGRX: you can't simply write synchronous code :) you have to use observables.
        // So, the following code must be re-written properly:
        //     if (!this.bookmarkedFilmsStore.getValue().bookmarks) {
        //       return this.updateDictionary();
        //     }

        return this.store
                   .select(selectAllBookmarks)
                   .pipe(
                     switchMap((bookmarks: BookmarkedMediaDictionary | null) => {
                       if (bookmarks == null) {
                         // NOTE: technically, this is a correct piece of code
                         // BUT I wouldn't recommend implementing it this way.
                         return this.updateDictionary();
                       }

                       return this.store.select(selectAllBookmarksNotNull);
                     })
                   );
    }

    public add(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
      debugger;
        return this.bookmarkedFilmsApi.add(kinopoiskId, bookmarkId)
            .pipe(
                tap(() => this.store.dispatch(bookmarkAddedAction({kinopoiskId, bookmarkId}))),
            );
    }

    public remove(kinopoiskId: string, bookmarkId: BookmarkEnum): Observable<unknown> {
      debugger;
        return this.bookmarkedFilmsApi.remove(kinopoiskId, bookmarkId)
            .pipe(
              tap(() => this.store.dispatch(bookmarkRemovedAction({kinopoiskId, bookmarkId}))),
            );
    }
}
