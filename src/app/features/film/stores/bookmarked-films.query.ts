import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { BookmarkedFilmsState, BookmarkedFilmsStore } from '@features/film/stores/bookmarked-films.store';

@Injectable({ providedIn: 'root' })
export class BookmarkedFilmsQuery extends Query<BookmarkedFilmsState> {

  constructor(store: BookmarkedFilmsStore) {
    super(store);
  }


}
