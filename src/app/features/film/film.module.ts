import { NgModule } from '@angular/core';
import { bookmarksReducer } from '@features/film/stores/bookmarked-films.reducer';
import { featureKey } from '@features/film/stores/bookmarked-films.selectors';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared';
import { DownloadedFilmCardComponent, FilmCardComponent } from './components';

@NgModule({
    declarations: [
        FilmCardComponent,
        DownloadedFilmCardComponent
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature(featureKey, bookmarksReducer)
    ],
    exports: [
        FilmCardComponent,
        DownloadedFilmCardComponent
    ]
})
export class FilmModule {}
