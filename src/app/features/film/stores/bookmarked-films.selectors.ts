import { BookmarkedFilmsState } from '@features/film/stores/bookmarked-films.state';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { filter, map, mergeMap, pipe } from 'rxjs';

export const featureKey = 'film';

const selectFeature = createFeatureSelector<BookmarkedFilmsState>(featureKey);

const selectStatus = createSelector(selectFeature, (state) => state.status);

export const isErrored = createSelector(selectStatus, (status) => status === 'errored');
export const isLoading = createSelector(selectStatus, (status) => status === 'loading');
export const isLoaded = createSelector(selectStatus, (status) => status === 'loaded');

export const selectAllBookmarks = createSelector(selectFeature, (state) => state.bookmarks);

const selectLoadedBookmarksInternalSelector = createSelector(selectFeature, (x) => ({loaded: x.status === 'loaded', bookmarks: x.bookmarks}));
export const selectLoadedBookmarks = pipe(
  select(selectLoadedBookmarksInternalSelector),
  filter(x => x.loaded === true),
  map(x => x.bookmarks),
);

// Remember duplicated code that searches for bookmarks by user? Here is a oneliner that removes this smelly code
// Old article about parametrized selectors: https://timdeschryver.dev/blog/parameterized-selectors
export const selectAllBookmarksForKinopoiskId = (kinopoiskId: string) => createSelector(selectFeature, (state) => state.bookmarks[kinopoiskId] || []);
