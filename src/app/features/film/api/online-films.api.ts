import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable, of } from 'rxjs';
import { VideoCdnFilters, VideoCdnResponse } from '../../video-cdn';
import { DetailedFilmInfo, Film } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OnlineFilmsApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public get(kinopoiskId: string): Observable<Film> {
        return this.apiService.get<Film>(`/films/${kinopoiskId}`);
    }

    public getDetailedInfo(kinopoiskId: string): Observable<DetailedFilmInfo> {
        return this.apiService.get<DetailedFilmInfo>(`/films/${kinopoiskId}/detailed`);
    }

    public getAllByFilters(filters: VideoCdnFilters): Observable<VideoCdnResponse<Film>> {

        if (filters.year === '') {
          const films2022: Film[] = [
            {
              kinopoiskId: '6789',
              previewUrl: 'https://www.boredpanda.com/blog/wp-content/uploads/2022/08/62f34e4971a38_cute-funny-parrots.jpg',
              media: [
                {
                  id: 1,
                  duration: 100,
                  maxQuality: 720,
                  translationId: 1,
                  translationName: 'TODO'
                }
              ],
              iframeSrc: 'TODO',
              year: '2022',
              title: 'Parrots',
              translation: 'Вбивчі папуги'
            },
            {
              kinopoiskId: '7890',
              previewUrl: 'https://i.pinimg.com/736x/85/6c/f6/856cf61d5c14c1ac71223e012afbd554.jpg',
              media: [
                {
                  id: 2,
                  duration: 500,
                  maxQuality: 720,
                  translationId: 2,
                  translationName: 'TODO'
                }
              ],
              iframeSrc: 'TODO',
              year: '2022',
              title: 'Parrots 2',
              translation: 'Вбивчі папуги повертаються'
            }
          ];

          const result: VideoCdnResponse<Film> = {
            data: films2022,
            current_page: 1,
            total: 1,
          } as VideoCdnResponse<Film>;

          return of(result);
        }

        return this.apiService.get<VideoCdnResponse<Film>>(
            `/films`,
            { params: (filters as any) }
        );
    }

    public download(kinopoiskId: string, mediaId: number): Observable<unknown> {
        return this.apiService.post(`/films/${kinopoiskId}/download/${mediaId}`, {});
    }
}
