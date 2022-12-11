import { BookmarkedMediaDictionary } from '@core/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureKey = 'film';

const selectFeature = createFeatureSelector<BookmarkedMediaDictionary | null>(featureKey);

export const selectAllBookmarks = createSelector(
  selectFeature,
  (state) => state
);

export const selectAllBookmarksNotNull = createSelector(
  selectFeature,
  (state) => state || {}
);
