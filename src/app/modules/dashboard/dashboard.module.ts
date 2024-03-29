import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from '@angular/material/table';
import {AppointmentPreviewComponent} from "./appointment-preview/appointment-preview.component";
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { AppointmentReportDialogComponent } from './appointment-report-dialog/appointment-report-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MaterialModule} from "../material/material.module";
import { NextPatientsViewComponent } from './next-patients-view/next-patients-view.component';
import {AppointmentClient} from "../../api/api-reference";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentPreviewComponent,
    AppointmentReportDialogComponent,
    NextPatientsViewComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MaterialModule,
    FormsModule,
    MatDialogModule
  ],
  providers:[
    AppointmentClient
  ]
})
export class DashboardModule { }
