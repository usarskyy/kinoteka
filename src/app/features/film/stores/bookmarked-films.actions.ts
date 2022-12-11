import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkEnum } from '@features/bookmark';
import { createAction, props } from '@ngrx/store';

export const bookmarksLoadedAction = createAction('[FILM_BOOKMARK] bookmarks loaded', props<BookmarkedMediaDictionary>());
export const bookmarkAddedAction = createAction('[FILM_BOOKMARK] add', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());
export const bookmarkRemovedAction = createAction('[FILM_BOOKMARK] remove', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());
