import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { VideoCdnFilters, VideoCdnResponse } from '@features/video-cdn';
import { Observable, of } from 'rxjs';
import { TvSeries } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class OnlineTvSeriesApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public get(kinopoiskId: string): Observable<TvSeries> {
        return this.apiService.get<TvSeries>(`/tv-serieses/${kinopoiskId}`);
    }

    public getAllByFilters(filters: VideoCdnFilters): Observable<VideoCdnResponse<TvSeries>> {

        if (filters.year === '') {
          const tvSeries2022: TvSeries[] = [
            {
              kinopoiskId:'1234',
              episodeCount: 2,
              title: 'Blahblah 2022-1',
              startDate: '01.01.2022',
              endDate: '02.01.2022',
              seasonCount: 1,
              previewUrl: 'https://media.istockphoto.com/id/680810342/photo/dog-watching-tv-on-the-couch.jpg?s=612x612&w=0&k=20&c=CQXmfuqlwL49GhcLDXIQSEZwq3iGpIkPJneWJUiI_0U=',
              iframeSrc: 'TODO',
              episodes: [
                {
                  title: 'Ep1',
                  duration: 30,
                  num: '1',
                  media: [],
                  releaseDate: '01.01.2022',
                  seasonNum: 1
                },
                {
                  title: 'Ep2',
                  duration: 30,
                  num: '2',
                  media: [],
                  releaseDate: '02.01.2022',
                  seasonNum: 1
                }
              ]
            },
            {
              kinopoiskId:'2345',
              episodeCount: 2,
              title: 'Blahblah 2022-2',
              startDate: '02.01.2022',
              endDate: '03.01.2022',
              seasonCount: 1,
              previewUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBjYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
              iframeSrc: 'TODO',
              episodes: [
                {
                  title: 'Ep1',
                  duration: 30,
                  num: '1',
                  media: [],
                  releaseDate: '02.01.2022',
                  seasonNum: 1
                },
                {
                  title: 'Ep2',
                  duration: 30,
                  num: '2',
                  media: [],
                  releaseDate: '03.01.2022',
                  seasonNum: 1
                }
              ]
            }
          ]

          const result: VideoCdnResponse<TvSeries> = {
            data: tvSeries2022,
            current_page: 1,
            total: 1,
          } as VideoCdnResponse<TvSeries>;

          return of(result);
        }

        return this.apiService.get<VideoCdnResponse<TvSeries>>(
            `/tv-serieses`,
            { params: (filters as any) }
        );
    }
}
