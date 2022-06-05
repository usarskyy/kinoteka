import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IconModule, SearchModule, YearPickerModule } from './components';
import { SafePipe } from './pipes';

@NgModule({
    declarations: [
        SafePipe
    ],
    exports: [
        SafePipe,
        SearchModule,
        IconModule,
        YearPickerModule,

        CommonModule,
        RouterModule,
        MatRippleModule,
        MatSidenavModule,
        MatButtonModule,
        MatBadgeModule,
        MatListModule,
        MatBottomSheetModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatChipsModule,
        PortalModule
    ]
})
export class SharedModule {}
