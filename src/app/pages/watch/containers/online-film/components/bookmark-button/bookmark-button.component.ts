import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { Bookmark, BookmarkEnum } from '@features/bookmark';
import { addBookmarkAction, loadBookmarksAction, removeBookmarkAction } from '@features/film/stores/bookmarked-films.actions';
import { selectAllBookmarksForKinopoiskId } from '@features/film/stores/bookmarked-films.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OpenedFilmState } from '../../states';

@Component({
    selector: 'app-bookmark-button',
    templateUrl: './bookmark-button.component.html',
    styleUrls: ['./bookmark-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class BookmarkButtonComponent implements OnInit {
    public bookmarks$!: Observable<BookmarkEnum[]>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly openedFilmState: OpenedFilmState,
        private readonly store: Store,
    ) {}

    public ngOnInit(): void {
        this.initBookmarksObservable();
        this.store.dispatch(loadBookmarksAction());
    }

    public onBookmarkSelected(bookmark: Bookmark): void {
      this.store.dispatch(addBookmarkAction({kinopoiskId: this.openedFilmState.data!.kinopoiskId, bookmarkId: bookmark.type}));
    }

    public onBookmarkDeselected(bookmark: Bookmark): void {
      this.store.dispatch(removeBookmarkAction({kinopoiskId: this.openedFilmState.data!.kinopoiskId, bookmarkId: bookmark.type}));
    }

    private initBookmarksObservable(): void {
        this.bookmarks$ = this.store.select(selectAllBookmarksForKinopoiskId(this.openedFilmState.data!.kinopoiskId));
    }
}
