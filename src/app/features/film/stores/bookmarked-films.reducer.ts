import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkedFilmsState } from './bookmarked-films.state';
import { addBookmarkCompletedAction, loadBookmarksAction, loadBookmarksCompletedAction, removeBookmarkCompletedAction } from './bookmarked-films.actions';
import { createReducer, on } from '@ngrx/store';

export const bookmarksReducer = createReducer<BookmarkedFilmsState>(
  {status: 'empty', bookmarks: {}},

  on(loadBookmarksAction, (state) => {

    if (state.status === 'loaded') {
      return state;
    }

    return {...state, status: 'loading'};
  }),

  on(loadBookmarksCompletedAction, (state, payload) => {
    switch (payload.status) {
      case 'success':
        return {...state, bookmarks: payload.bookmarks, status: 'loaded'};

      case 'error':
        return {...state, status: 'errored'};

      default:
        throw new Error(`Unknown action status: ${JSON.stringify(payload)}`);
    }
  }),

  on(addBookmarkCompletedAction, (state, payload) => {
    switch (payload.status) {
      case 'success':
        const newBookmarks: BookmarkedMediaDictionary = {...state.bookmarks};

        newBookmarks[payload.kinopoiskId] = [...(state.bookmarks[payload.kinopoiskId] || []), payload.bookmarkId];

        return {...state, bookmarks: newBookmarks};

      case 'error':
        // TODO: log, show alert or do something else
        throw new Error('NOT IMPLEMENTED');

      default:
        throw new Error(`Unknown action status: ${JSON.stringify(payload)}`);
    }
  }),

  on(removeBookmarkCompletedAction, (state, payload) => {

    switch (payload.status) {
      case 'success':
        const newBookmarks: BookmarkedMediaDictionary = {...state.bookmarks};
        const userBookmarks = state.bookmarks[payload.kinopoiskId];

        if (userBookmarks) {
          newBookmarks[payload.kinopoiskId] = userBookmarks.filter(b => b !== payload.bookmarkId);

          return {...state, bookmarks: newBookmarks};
        }

        return state;

      case 'error':
        // TODO: log, show alert or do something else
        throw new Error('NOT IMPLEMENTED');

      default:
        throw new Error(`Unknown action status: ${JSON.stringify(payload)}`);
    }
  }),
);
