import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkEnum } from '@features/bookmark';
import { createAction, props } from '@ngrx/store';

// NOTE: 'Action' suffix os not required, I add it to clearly identity type of the object and make my search/navigation easier

export const loadBookmarksAction = createAction('[FILM_BOOKMARK] load bookmarks');
export const bookmarksLoadedAction = createAction('[FILM_BOOKMARK] bookmarks loaded', props<BookmarkedMediaDictionary>());

export const addBookmarkAction = createAction('[FILM_BOOKMARK] add bookmark', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());
export const bookmarkAddedAction = createAction('[FILM_BOOKMARK] bookmark added', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());

export const removeBookmarkAction = createAction('[FILM_BOOKMARK] remove bookmark', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());
export const bookmarkRemovedAction = createAction('[FILM_BOOKMARK] bookmark removed', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());
