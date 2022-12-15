import { filmsFeature } from '@features/film/stores/bookmarked-films.reducer';
import { createSelector, select } from '@ngrx/store';
import { filter, map, pipe } from 'rxjs';

export const isErrored = createSelector(filmsFeature.selectStatus, (status) => status === 'errored');
export const isLoading = createSelector(filmsFeature.selectStatus, (status) => status === 'loading');
export const isLoaded = createSelector(filmsFeature.selectStatus, (status) => status === 'loaded');

export const selectAllBookmarks = filmsFeature.selectBookmarks;

const selectLoadedBookmarksInternalSelector = createSelector(filmsFeature.selectFilmsState, (x) => ({loaded: x.status === 'loaded', bookmarks: x.bookmarks}));
export const selectLoadedBookmarks = pipe(
  select(selectLoadedBookmarksInternalSelector),
  filter(x => x.loaded === true),
  map(x => x.bookmarks),
);

// Remember duplicated code that searches for bookmarks by user? Here is a oneliner that removes this smelly code
// Old article about parametrized selectors: https://timdeschryver.dev/blog/parameterized-selectors
export const selectAllBookmarksForKinopoiskId = (kinopoiskId: string) => createSelector(filmsFeature.selectBookmarks, (bookmarks) => bookmarks[kinopoiskId] || []);
