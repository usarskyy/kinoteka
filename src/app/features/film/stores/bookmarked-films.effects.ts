import { Injectable } from '@angular/core';
import { BookmarkedFilmsApi } from '@features/film/api';
import {
  addBookmarkAction,
  bookmarkAddedAction,
  bookmarkRemovedAction,
  bookmarksLoadedAction,
  loadBookmarksAction,
  removeBookmarkAction
} from '@features/film/stores/bookmarked-films.actions';
import { selectAllBookmarks } from '@features/film/stores/bookmarked-films.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class BookmarkedFilmsEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly bookmarkedFilmsApi: BookmarkedFilmsApi,
    private readonly store: Store,
  ) {
  }

  addBookmark$ = createEffect(() =>
                                this.actions$.pipe(
                                  ofType(addBookmarkAction),
                                  mergeMap((payload) => {

                                    return this.bookmarkedFilmsApi
                                               .add(payload.kinopoiskId, payload.bookmarkId)
                                               .pipe(
                                                 map(() => bookmarkAddedAction(payload)),
                                                 //catchError(() => of(...))
                                               );
                                  })
                                ));

  removeBookmark$ = createEffect(() =>
                                this.actions$.pipe(
                                  ofType(removeBookmarkAction),
                                  mergeMap((payload) => {

                                    return this.bookmarkedFilmsApi
                                               .add(payload.kinopoiskId, payload.bookmarkId)
                                               .pipe(
                                                 map(() => bookmarkRemovedAction(payload)),
                                                 //catchError(() => of(...))
                                               );
                                  })
                                ));

  loadBookmarks$ = createEffect(() =>
                                  this.actions$.pipe(
                                    ofType(loadBookmarksAction),
                                    mergeMap(() => this.store.select(selectAllBookmarks)),
                                    filter(x => x == null),
                                    switchMap((existingBookmarks) => {
                                      return this.bookmarkedFilmsApi
                                                 .getAsDictionary()
                                                 .pipe(
                                                   map(data => bookmarksLoadedAction(data)),
                                                   //catchError(() => of(...))
                                                 );
                                    })
                                  ));
}
