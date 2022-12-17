import { Injectable } from '@angular/core';
import { BookmarkedFilmsApi } from '@features/film/api';
import { FilmBookmarkActions } from './bookmarked-films.actions';
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
                                  ofType(FilmBookmarkActions.addBookmark),
                                  mergeMap((payload) => {

                                    return this.bookmarkedFilmsApi
                                               .add(payload.kinopoiskId, payload.bookmarkId)
                                               .pipe(
                                                 map(() => FilmBookmarkActions.addBookmarkCompleted({ ...payload, status: 'success' })),
                                                 catchError(() => of(FilmBookmarkActions.addBookmarkCompleted({ status: 'error' }))),
                                               );
                                  })
                                ));

  removeBookmark$ = createEffect(() =>
                                   this.actions$.pipe(
                                     ofType(FilmBookmarkActions.removeBookmark),
                                     mergeMap((payload) => {

                                       return this.bookmarkedFilmsApi
                                                  .add(payload.kinopoiskId, payload.bookmarkId)
                                                  .pipe(
                                                    map(() => FilmBookmarkActions.removeBookmarkCompleted({ ...payload, status: 'success' })),
                                                    catchError(() => of(FilmBookmarkActions.removeBookmarkCompleted({ status: 'error' })))
                                                  );
                                     })
                                   ));

  loadBookmarks$ = createEffect(() =>
                                  this.actions$.pipe(
                                    ofType(FilmBookmarkActions.loadBookmarks),
                                    mergeMap(() => this.store.select(isLoaded)),
                                    filter(x => x === false),
                                    switchMap(() => {
                                      return this.bookmarkedFilmsApi
                                                 .getAsDictionary()
                                                 .pipe(
                                                   map(data => FilmBookmarkActions.loadBookmarksCompleted({ status: 'success', bookmarks: data })),
                                                   catchError(() => of(FilmBookmarkActions.loadBookmarksCompleted({ status: 'error' })))
                                                 );
                                    })
                                  ));
}
