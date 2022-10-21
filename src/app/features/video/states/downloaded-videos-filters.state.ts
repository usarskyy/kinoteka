import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'ngx-base-state';
import { VideoCdnFilters } from '../../video-cdn';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class DownloadedVideosFiltersState extends ObjectState<VideoCdnFilters> {
    constructor() {
        super({
            query: '',
            year: '',
            page: '1',
            limit: '30'
        });
    }
}
