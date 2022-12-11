import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { Bookmark, BookmarkEnum } from '@features/bookmark';
import { BookmarkedFilmsService, DownloadedFilm } from '@features/film';
import { selectAllBookmarksNotNull } from '@features/film/stores/bookmarked-films.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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
        private readonly bookmarkedFilmsService: BookmarkedFilmsService,
        private readonly store: Store,
    ) {}

    public ngOnInit(): void {
        this.initBookmarksObservable();
        this.updateBookmarkedFilmsDictionaryIfAbsent();
    }

    public onBookmarkSelected(bookmark: Bookmark): void {
        this.bookmarkedFilmsService.add(this.film.kinopoiskId, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    public onBookmarkDeselected(bookmark: Bookmark): void {
        this.bookmarkedFilmsService.remove(this.film.kinopoiskId, bookmark.type)
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private updateBookmarkedFilmsDictionaryIfAbsent(): void {
        this.bookmarkedFilmsService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }

    private initBookmarksObservable(): void {
        this.bookmarks$ = this.store.select(selectAllBookmarksNotNull)
            .pipe(
                map((dictionary) => (dictionary[this.film.kinopoiskId] ?? []))
            );
    }
}
