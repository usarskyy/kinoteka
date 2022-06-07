import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmDetailsWindowModule } from './film-details-window';
import { HeaderPortalContentComponent } from './header-portal-content';
import { OnlineComponent } from './online.component';
import { OnlineRouting } from './online.routing';
import { PaginatorComponent } from './paginator';

@NgModule({
    declarations: [
        OnlineComponent,
        HeaderPortalContentComponent,
        PaginatorComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        OnlineRouting,
        FilmDetailsWindowModule
    ]
})
export class OnlineModule {}
