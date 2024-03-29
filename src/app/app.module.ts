import {HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./modules/material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgToastModule} from "ng-angular-popup";
import { AppComponent } from "./app.component";
import {
  AppointmentClient,
  DoctorClient,
  FeedbackClient,
  PatientClient,
  ScheduleClient,
  ApplicationUserClient,
  HolidayClient,
  BloodUnitClient,
  BloodConsumptionClient,
  PatientAdmissionClient,
  ConsiliumClient,
  SpecializationsClient,
  EventStoreExaminationClient
} from "./api/api-reference";
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {ScheduleModule} from "./modules/schedule/schedule.module";
import {LoginModule} from "./modules/login/login.module";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helpers/auth.interceptor";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { SignOutComponent} from './components/sign-out/sign-out.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogSignComponent } from './components/dialog-sign/dialog-sign.component';
import {CommonComponentsModule} from "./components/common-components.module";
import { ScheduleHolidayComponent } from './modules/hoiday/schedule-holiday/schedule-holiday.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { DoctorsHolidaysComponent } from './modules/hoiday/doctors-holidays/doctors-holidays.component';
import {ExaminationModule} from "./modules/examination/examination.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ConsiliumModule} from "./modules/consilium-dashboard/consilium.module";
import { GenerateBloodStatisticComponent } from "./modules/hospital/generate-blood-statistic/generate-blood-statistic.component";
import { BrowserModule } from "@angular/platform-browser";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import { RoomEventsComponent } from './modules/hospital/room-events/room-events.component';
import {PatientHealthModule} from "./modules/patient-health/patient-health.module";
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    SignOutComponent,
    DialogSignComponent,
    ScheduleHolidayComponent,
    DoctorsHolidaysComponent,
    GenerateBloodStatisticComponent,
    RoomEventsComponent,
  ],
  exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        HospitalModule,
        NgToastModule,
        HttpClientModule,
        ScheduleModule,
        LoginModule,
        DashboardModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule,
        MatGridListModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        CommonComponentsModule,
        MatCheckboxModule,
        ExaminationModule,
        MatTabsModule,
        ConsiliumModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        PatientHealthModule,
        MatBadgeModule
    ],
  providers: [
    DoctorClient,
    AppointmentClient,
    PatientClient,
    HolidayClient,
    ScheduleClient,
    FeedbackClient,
    ApplicationUserClient,
    authInterceptorProviders,
    BloodUnitClient,
    BloodConsumptionClient,
    PatientAdmissionClient,
    ConsiliumClient,
    SpecializationsClient,
    EventStoreExaminationClient
  ]
})
export class AppModule { }
