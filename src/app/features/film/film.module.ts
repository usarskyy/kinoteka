import { NgModule } from '@angular/core';
import { BookmarkedFilmsEffects } from '@features/film/stores/bookmarked-films.effects';
import { filmsFeature } from '@features/film/stores/bookmarked-films.reducer';
import { EffectsModule } from '@ngrx/effects';
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

        StoreModule.forFeature(filmsFeature),
        EffectsModule.forFeature([BookmarkedFilmsEffects])
    ],
    exports: [
        FilmCardComponent,
        DownloadedFilmCardComponent
    ]
})
export class FilmModule {}
