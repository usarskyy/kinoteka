import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { OnlineTvSeriesFiltersService, OnlineTvSeriesService, TvSeries } from '@features/tv-series';
import { VideoCdnResponse } from '@features/video-cdn';
import { ContentZoneService, HeaderService } from '@layouts';
import { merge, Observable, skip, Subject, takeUntil } from 'rxjs';
import { HeaderPortalContentComponent } from './header-portal-content';

@Component({
    selector: 'app-online',
    templateUrl: './online.component.html',
    styleUrls: ['./online.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineComponent implements OnInit {
    public tvSeriesResponse$!: Observable<VideoCdnResponse<TvSeries> | null>;

    private get viewDestroyedOrFiltersChanged$(): Observable<unknown> {
        return merge(
            this.viewDestroyed$,
            this.tvSeriesFiltersService.data$
                .pipe(skip(1))
        )
    }

    private readonly viewDestroyed$ = new Subject<boolean>();

    constructor(
        private readonly router: Router,
        private readonly contentZoneService: ContentZoneService,
        private readonly headerService: HeaderService,
        private readonly tvSeriesService: OnlineTvSeriesService,
        private readonly tvSeriesFiltersService: OnlineTvSeriesFiltersService
    ) {}

    public ngOnInit(): void {
        this.tvSeriesResponse$ = this.tvSeriesService.tvSeriesResponse$;

        this.headerService.setPortalComponent(HeaderPortalContentComponent);
        this.updateTvSeriesIfAbsent();
        this.initTvSeriesFiltersObserver();
    }

    public ngOnDestroy(): void {
        this.headerService.clearPortalComponent();
        this.viewDestroyed$.next(true);
        this.viewDestroyed$.complete();
    }

    public onTvSeriesClick(data: TvSeries): void {
        this.router.navigateByUrl(`${AppRouteEnum.WatchOnlineTvSeries}/${data.kinopoiskId}`);
    }

    private updateTvSerieses(): void {
        this.tvSeriesService.updateAllByFilters()
            .pipe(takeUntil(this.viewDestroyedOrFiltersChanged$))
            .subscribe(() => this.contentZoneService.scrollTop());
    }

    private updateTvSeriesIfAbsent(): void {
        this.tvSeriesService.updateAllByFiltersIfAbsent()
            .subscribe();
    }

    private initTvSeriesFiltersObserver(): void {
        this.tvSeriesFiltersService.data$
            .pipe(
                skip(1),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.updateTvSerieses());
    }
}