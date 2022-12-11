import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { FavoriteFilmsService, Film } from '@features/film';
import { selectAllBookmarksNotNull } from '@features/film/stores/bookmarked-films.selectors';
import { Store } from '@ngrx/store';
import { WatchRoutingEnum } from '@pages/watch/enums';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
    public films$!: Observable<Film[]>;

    public bookmarkedFilmsDictionary$: Observable<BookmarkedMediaDictionary | null> = this.store.select(selectAllBookmarksNotNull);

    constructor(
        private readonly router: Router,
        private readonly favoriteFilmsService: FavoriteFilmsService,
        private readonly store: Store,
    ) {}

    public ngOnInit(): void {
        this.films$ = this.favoriteFilmsService.getAll();
    }

    public onFilmClick(film: Film): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineFilm}/${film.kinopoiskId}`);
    }
}
