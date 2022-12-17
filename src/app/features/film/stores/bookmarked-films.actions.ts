import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BookmarkEnum } from '@features/bookmark';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

// NOTE: Here I repeat "status: 'success'/'error'" multiple times but in a real project I would simply create a generic type like:
//     type PayloadDefinition<T> = { status: 'success', data: T } | { status: 'error' };
//     const success: PayloadDefinition<BookmarkedMediaDictionary> = {status: 'success', data: {}};
//     const error: PayloadDefinition<BookmarkedMediaDictionary> = {status: 'error'};

export const FilmBookmarkActions = createActionGroup(
  {
    source: 'FILM_BOOKMARK',
    events: {
      'Load bookmarks': emptyProps(),

      // At the end the app won't compile because discriminated union types are not processed correctly
      'Load bookmarks completed': props<{ status: 'success', bookmarks: BookmarkedMediaDictionary } | { status: 'error' }>(),

      'Add bookmark': props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>(),
      'Add bookmark completed': props<{ status: 'success', kinopoiskId: string, bookmarkId: BookmarkEnum } | { status: 'error' }>(),

      'Remove bookmark': props<{ kinopoiskId: string, bookmarkId: BookmarkEnum }>(),
      'Remove bookmark completed': props<{ status: 'success', kinopoiskId: string, bookmarkId: BookmarkEnum } | { status: 'error' }>()
    }
  }
);
