import { BookmarkedMediaDictionary } from '@core/interfaces';

export interface BookmarkedFilmsState {
  status: 'loaded' | 'empty' | 'errored' | 'loading';
  bookmarks: BookmarkedMediaDictionary;
}
