import { Injectable } from '@angular/core';
import { BookmarkedMediaDictionary } from '@core/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookmarkEnum } from '../../bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkedFilmsState {

    private readonly state$ = new BehaviorSubject<BookmarkedMediaDictionary | null>(null);

    ////// NOT REQUIRED, ADDED FOR BACKWARD COMPATIBILITY -> START ->
    public get data$(): Observable<BookmarkedMediaDictionary | null> {
      return this.state$;
    }

    public get data(): BookmarkedMediaDictionary | null {
      return this.state$.value;
    }

    public set(value: BookmarkedMediaDictionary): void {
      return this.state$.next(value);
    }
    ////// -> END

    public add(kinopoiskId: string, bookmark: BookmarkEnum): void {
        debugger;

        let bookmarks = this.getBookmarks(kinopoiskId);
        bookmarks = [...bookmarks, bookmark];

        const newState = {...this.state$.value, ...{ [kinopoiskId]: bookmarks }};

        this.state$.next(newState);
    }

    public remove(kinopoiskId: string, bookmark: BookmarkEnum): void {
        debugger;

        let bookmarks = this.getBookmarks(kinopoiskId);
        bookmarks = bookmarks.filter((currBookmark) => (currBookmark !== bookmark));

        const newState = {...this.state$.value, ...{ [kinopoiskId]: bookmarks }};

        this.state$.next(newState);
    }

    private getBookmarks(kinopoiskId: string): BookmarkEnum[] {
        return this.state$.value?.[kinopoiskId] ?? [];
    }
}
