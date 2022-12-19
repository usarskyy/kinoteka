export interface FilmMedia {
    readonly id: number;
    readonly translationId: number;
    readonly maxQuality: number;

    // code was changed on purpose to simulate unwanted state mutation
    duration: number;

    readonly translationName: string;
}
