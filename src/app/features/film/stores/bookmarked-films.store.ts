import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { Store, StoreConfig } from '@datorama/akita';

// NOTE: had to downgrade TS to 4.7 because of this issue: https://github.com/salesforce/akita/issues/870
// Akita is not well supported


// Technically, BookmarkedMediaDictionary could be used as a state BUT because an author of this app
// also uses 'null' (inherited from bgx-base-state), the original implementation is not compatible with Akita.
// Therefore a new state type had to be defined.
export interface BookmarkedFilmsState {
  bookmarks: BookmarkedMediaDictionary | null;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'bookmarked-media'})
export class BookmarkedFilmsStore extends Store<BookmarkedFilmsState> {

  constructor() {
    super({bookmarks: null});
  }
}
