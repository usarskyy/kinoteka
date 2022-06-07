import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DownloadButtonComponent } from './download-button';
import { FavoriteButtonComponent } from './favorite-button';
import { FilmDetailsWindowComponent } from './film-details-window.component';
import { FilmDownloadProgressComponent } from './film-download-progress';

@NgModule({
    declarations: [
        FilmDetailsWindowComponent,
        FilmDownloadProgressComponent,
        DownloadButtonComponent,
        FavoriteButtonComponent
    ],
    imports: [
        SharedModule
    ]
})
export class FilmDetailsWindowModule {}