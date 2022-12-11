import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DestroyService } from '@core/services';
import { loadBookmarksAction } from '@features/film/stores/bookmarked-films.actions';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class FilmsComponent implements OnInit {
    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<boolean>,
        private readonly store: Store
    ) {}

    public ngOnInit(): void {
        this.store.dispatch(loadBookmarksAction());

        // this.updateBookmarkedFilmsDictionaryIfAbsent();
    }

    // Very weird way of writing code:
    // 1. action will be executed once but 'takeUntil(this.viewDestroyed$)' is still used
    // 2. extracting this logic into a separate method doesn't really bring anything
    /*
    private updateBookmarkedFilmsDictionaryIfAbsent(): void {
        this.bookmarkedFilmsService.updateDictionaryIfAbsent()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe();
    }
     */
}
