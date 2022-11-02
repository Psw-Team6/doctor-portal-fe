import {HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import {AppointmentClient, DoctorClient, PatientClient, ScheduleClient} from "./api/api-reference";
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {ScheduleModule} from "./modules/schedule/schedule.module";
import {LoginModule} from "./login/login/login.module";
import {DashboardModule} from "./components/dashboard/dashboard.module";
import { RescheduleAppointmentComponent } from './components/reschedule-appointment/reschedule-appointment.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    RescheduleAppointmentComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        PagesModule,
        HospitalModule,
        HttpClientModule,
        ScheduleModule,
        LoginModule,
        DashboardModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule,
        MatGridListModule,
        ReactiveFormsModule

    ],
  providers: [
    DoctorClient,
    AppointmentClient,
    PatientClient,
    ScheduleClient
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
