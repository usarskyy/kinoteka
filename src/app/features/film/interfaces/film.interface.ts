import { FilmMediaFileMetadata } from './film-media-file-metadata.interface';

export interface Film {
    readonly title: string;
    readonly kinopoiskId: string;
    readonly translation: string;
    readonly year: string;
    readonly iframeSrc: string;
    readonly previewUrl: string;
    readonly media: FilmMediaFileMetadata[];
}