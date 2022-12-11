import { BookmarkedMediaDictionary } from '@core/interfaces';
import { bookmarkAddedAction, bookmarkRemovedAction, bookmarksLoadedAction } from './bookmarked-films.actions';
import { createReducer, on } from '@ngrx/store';


// Here it gets a bit weird. Unfortunately because of the backward compatibility I have to use 'BookmarkedMediaDictionary | null'.
// I would prefer to have a separate type with a property 'bookmarks' to make this state easily extensible
// and avoid problems with null values.

export const bookmarksReducer = createReducer<BookmarkedMediaDictionary | null>(
  null,

  on(bookmarksLoadedAction, (state, payload) => payload),

  on(bookmarkAddedAction, (state, payload) => {

    const allBookmarks: BookmarkedMediaDictionary = {...(state || {})};

    allBookmarks[payload.kinopoiskId] = [...(allBookmarks[payload.kinopoiskId] || []), payload.bookmarkId];

    return allBookmarks;
  }),

  on(bookmarkRemovedAction, (state, payload) => {

    const notNullState: BookmarkedMediaDictionary = {...(state || {})};
    const userBookmarks = notNullState[payload.kinopoiskId];

    if (userBookmarks) {
      notNullState[payload.kinopoiskId] = userBookmarks.filter(b => b !== payload.bookmarkId);

      return notNullState;
    }

    return state;
  }),
);
