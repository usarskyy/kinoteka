import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import {
    BookmarkButtonComponent,
    DownloadButtonComponent,
    FavoriteButtonComponent,
    FilmDownloadProgressComponent
} from './components';
import { OnlineFilmComponent } from './online-film.component';
import { OnlineFilmRouting } from './online-film.routing';

@NgModule({
    declarations: [
        OnlineFilmComponent,
        DownloadButtonComponent,
        FavoriteButtonComponent,
        FilmDownloadProgressComponent,
        BookmarkButtonComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        OnlineFilmRouting
    ]
})
export class OnlineFilmModule {}
