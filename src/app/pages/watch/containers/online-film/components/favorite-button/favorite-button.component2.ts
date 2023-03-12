import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FavoriteFilmsService } from '@features/film';
import { Subject, takeUntil } from 'rxjs';
import { OpenedFilmState } from '../../states';

@Component({
    selector: 'app-favorite-button',
    templateUrl: './favorite-button.component.html',
    styleUrls: ['./favorite-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {
    public isFilmFavorite: boolean = false;

    private readonly destroyed$ = new Subject<void>();

    constructor(
        private readonly openedFilmState: OpenedFilmState,
        private readonly favoriteFilmsService: FavoriteFilmsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initIsFilmFavorite();
    }


    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }


    public onToggleFavoriteButtonClick(): void {
        if (this.isFilmFavorite) {
            this.removeFromFavorites();
        } else {
            this.addToFavorites();
        }

        this.isFilmFavorite = !this.isFilmFavorite;
    }

    private addToFavorites(): void {
        this.favoriteFilmsService.add(this.openedFilmState.data!.kinopoiskId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    private removeFromFavorites(): void {
        this.favoriteFilmsService.remove(this.openedFilmState.data!.kinopoiskId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    private initIsFilmFavorite(): void {
        this.favoriteFilmsService.getState(this.openedFilmState.data!.kinopoiskId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((state) => {
                this.isFilmFavorite = state;

                this.changeDetector.detectChanges();
            })
    }
}
