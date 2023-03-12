import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AppRouteEnum } from '@core/enums';
import { BookmarkedFilmsService } from '@features/film';
import { DownloadingMediaCountSocketService } from '@features/media';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    @Output()
    public optionClick = new EventEmitter<Event>();

    public readonly appRouteEnum = AppRouteEnum;

    public mediaCount$!: Observable<string>;
    public isDownloadingMediaCountBadgeVisible$!: Observable<boolean>;

    constructor(
        private readonly downloadingMediaCountSocketService: DownloadingMediaCountSocketService,
        private readonly bookmarkedFilmsService: BookmarkedFilmsService,
    ) { }

    public ngOnInit(): void {

        // new requirement doesn't make much sense, I just need a second data source.
        this.mediaCount$ = combineLatest([this.downloadingMediaCountSocketService.data$, this.bookmarkedFilmsService.data$])
            .pipe(
                map((x) => {
                    const [downloadingCount, bookmarkedFilms] = x;

                    // Unfortunately, the author chose a Map type for 'bookmarkedFilms'.
                    const bookmarkedFilmsCount = bookmarkedFilms == null ? 0 : Object.getOwnPropertyNames(bookmarkedFilms).length;

                    return `${downloadingCount} / ${bookmarkedFilmsCount}`;
                })
            );

        // What if data from 'this.bookmarkedFilmsService.data$' is not yet availbale?
        // You may execute "this.bookmarkedFilmsService.updateDictionaryIfAbsent()" but this is not a good idea because will result
        // into multiple API calls.

        // DEMO:
        
        this.bookmarkedFilmsService.updateDictionaryIfAbsent()
            // commented out to make my code shorter:
            //.pipe(takeUntil(this.viewDestroyed$))
            .subscribe();

        this.initDownloadingFilmsCountBadgeVisibleObservable();
    }

    private initDownloadingFilmsCountBadgeVisibleObservable(): void {
        this.isDownloadingMediaCountBadgeVisible$ = this.downloadingMediaCountSocketService.data$
            .pipe(
                map((count) => (count >= -1))
            );
    }
}
