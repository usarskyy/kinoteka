import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkEnum } from '@features/bookmark';
import { createAction, props } from '@ngrx/store';

// NOTE: 'Action' suffix os not required, I add it to clearly identity type of the object and make my search/navigation easier

// NOTE: Here I repeat "status: 'success'/'error'" multiple times but in a real project I would simply create a generic type like:
//     type PayloadDefinition<T> = { status: 'success', data: T } | { status: 'error' };
//     const success: PayloadDefinition<BookmarkedMediaDictionary> = {status: 'success', data: {}};
//     const error: PayloadDefinition<BookmarkedMediaDictionary> = {status: 'error'};


export const loadBookmarksAction = createAction('[FILM_BOOKMARK] load bookmarks');
type loadBookmarksCompletedActionPayloadType = { status: 'success', bookmarks: BookmarkedMediaDictionary } | { status: 'error' };
export const loadBookmarksCompletedAction = createAction('[FILM_BOOKMARK] bookmarks loaded', props<loadBookmarksCompletedActionPayloadType>());

export const addBookmarkAction = createAction('[FILM_BOOKMARK] add bookmark', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());
type addBookmarkCompletedActionPayloadType = { status: 'success', kinopoiskId: string, bookmarkId: BookmarkEnum } | { status: 'error' };
export const addBookmarkCompletedAction = createAction('[FILM_BOOKMARK] bookmark added', props<addBookmarkCompletedActionPayloadType>());

export const removeBookmarkAction = createAction('[FILM_BOOKMARK] remove bookmark', props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>());
type removeBookmarkCompletedActionPayloadType = { status: 'success', kinopoiskId: string, bookmarkId: BookmarkEnum } | { status: 'error' };
export const removeBookmarkCompletedAction = createAction('[FILM_BOOKMARK] bookmark removed', props<removeBookmarkCompletedActionPayloadType>());
