import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {AppointmentPreviewComponent} from "./appointment-preview/appointment-preview.component";
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { AppointmentReportDialogComponent } from './appointment-report-dialog/appointment-report-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentPreviewComponent,
    AppointmentReportDialogComponent
  ],
    imports: [
        CommonModule,
        MatGridListModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule
    ]
})
export class DashboardModule { }
