import { Injectable } from '@angular/core';
import { filterNilValue, Query } from '@datorama/akita';
import { BookmarkedFilmsState, BookmarkedFilmsStore } from '@features/film/stores/bookmarked-films.store';

@Injectable({ providedIn: 'root' })
export class BookmarkedFilmsQuery extends Query<BookmarkedFilmsState> {

  // Personally, I don't understand why author uses 'bookmarks$' with possible 'null' value everywhere, as most of the time 'null' is not expected and breaks the code
  public readonly bookmarks$ = this.select(x => x.bookmarks);

  public readonly bookmarksNotNull$ = this.select(x => x.bookmarks).pipe(filterNilValue());


  constructor(store: BookmarkedFilmsStore) {
    super(store);
  }
}
