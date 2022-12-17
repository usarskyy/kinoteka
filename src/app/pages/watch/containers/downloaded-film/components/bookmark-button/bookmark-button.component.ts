import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { Bookmark, BookmarkEnum } from '@features/bookmark';
import { DownloadedFilm } from '@features/film';
import { FilmBookmarkActions } from '@features/film/stores/bookmarked-films.actions';
import { selectAllBookmarksForKinopoiskId } from '@features/film/stores/bookmarked-films.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
    @Input()
    public film!: DownloadedFilm;

    public bookmarks$!: Observable<BookmarkEnum[]>;

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly store: Store,
    ) {}

    public ngOnInit(): void {
        this.initBookmarksObservable();
        this.store.dispatch(FilmBookmarkActions.loadBookmarks());
    }

    public onBookmarkSelected(bookmark: Bookmark): void {
        this.store.dispatch(FilmBookmarkActions.addBookmark({kinopoiskId: this.film.kinopoiskId, bookmarkId: bookmark.type}));
    }

    public onBookmarkDeselected(bookmark: Bookmark): void {
        this.store.dispatch(FilmBookmarkActions.removeBookmark({kinopoiskId: this.film.kinopoiskId, bookmarkId: bookmark.type}));
    }

    private initBookmarksObservable(): void {
        this.bookmarks$ = this.store.select(selectAllBookmarksForKinopoiskId(this.film.kinopoiskId));
    }
}
