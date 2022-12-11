import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { DestroyService } from '@core/services';
import { Film, OnlineFilmsFiltersService, OnlineFilmsService } from '@features/film';
import { selectAllBookmarks } from '@features/film/stores/bookmarked-films.selectors';
import { VideoCdnResponse } from '@features/video-cdn';
import { ContentZoneService, HeaderService } from '@layouts';
import { Store } from '@ngrx/store';
import { WatchRoutingEnum } from '@pages/watch/enums';
import { merge, Observable, skip, takeUntil } from 'rxjs';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
    selector: 'app-online',
    templateUrl: './online.component.html',
    styleUrls: ['./online.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class OnlineComponent implements OnInit {
    public filmsResponse: VideoCdnResponse<Film> | null = null;

    public bookmarkedFilmsDictionary$: Observable<BookmarkedMediaDictionary | null> = this.store.select(selectAllBookmarks);

    private get viewDestroyedOrFiltersChanged$(): Observable<unknown> {
        return merge(
            this.viewDestroyed$,
            this.filmsFiltersService.data$
                .pipe(skip(1))
        )
    }

    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
        private readonly router: Router,
        private readonly contentZoneService: ContentZoneService,
        private readonly headerService: HeaderService,
        private readonly filmsService: OnlineFilmsService,
        private readonly filmsFiltersService: OnlineFilmsFiltersService,
        private readonly store: Store,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateFilms();
        this.initFilmsFiltersObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
    }

    public onFilmClick(film: Film): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineFilm}/${film.kinopoiskId}`);
    }

    private updateFilms(): void {
        this.filmsService.updateAllByFilters()
            .pipe(takeUntil(this.viewDestroyedOrFiltersChanged$))
            .subscribe((data) => {
                this.filmsResponse = data;

                this.contentZoneService.scrollTop();
                this.changeDetector.detectChanges();
            });
    }

    private initFilmsFiltersObserver(): void {
        this.filmsFiltersService.data$
            .pipe(
                skip(1),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.updateFilms());
    }
}
