import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { FavoriteFilmsService, Film } from '@features/film';
import { BookmarkedFilmsQuery } from '@features/film/stores/bookmarked-films.query';
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

    public bookmarkedFilmsDictionary$: Observable<BookmarkedMediaDictionary | null> = this.bookmarkedFilmsQuery.bookmarks$.pipe(map(x => x || {}));

    constructor(
        private readonly router: Router,
        private readonly favoriteFilmsService: FavoriteFilmsService,
        private readonly bookmarkedFilmsQuery: BookmarkedFilmsQuery,
    ) {}

    public ngOnInit(): void {
        this.films$ = this.favoriteFilmsService.getAll();
    }

    public onFilmClick(film: Film): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Watch}/${WatchRoutingEnum.OnlineFilm}/${film.kinopoiskId}`);
    }
}
