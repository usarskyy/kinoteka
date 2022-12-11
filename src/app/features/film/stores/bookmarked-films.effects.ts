import { Injectable } from '@angular/core';
import { BookmarkedFilmsApi } from '@features/film/api';
import {
  addBookmarkAction,
  addBookmarkCompletedAction,
  loadBookmarksCompletedAction,
  removeBookmarkAction,
  removeBookmarkCompletedAction,
} from './bookmarked-films.actions';
import { isLoaded } from './bookmarked-films.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of, switchMap } from 'rxjs';

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
                                                 map(() => addBookmarkCompletedAction({...payload, status: 'success'})),
                                                 catchError(() => of(addBookmarkCompletedAction({status: 'error'})))
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
                                                    map(() => removeBookmarkCompletedAction({...payload, status: 'success'})),
                                                    catchError(() => of(removeBookmarkCompletedAction({status: 'error'})))
                                                  );
                                     })
                                   ));

  loadBookmarks$ = createEffect(() =>
                                  this.actions$.pipe(
                                    mergeMap(() => this.store.select(isLoaded)),
                                    filter(x => x === false),
                                    switchMap(() => {
                                      return this.bookmarkedFilmsApi
                                                 .getAsDictionary()
                                                 .pipe(
                                                   map(data => loadBookmarksCompletedAction({status: 'success', bookmarks: data})),
                                                   catchError(() => of(loadBookmarksCompletedAction({status: 'error'})))
                                                 );
                                    })
                                  ));
}
