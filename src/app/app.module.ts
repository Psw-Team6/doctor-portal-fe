import {HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgToastModule} from "ng-angular-popup";
import { AppComponent } from "./app.component";
import {AppointmentClient, DoctorClient, FeedbackClient, PatientClient, ScheduleClient,ApplicationUserClient} from "./api/api-reference";
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {ScheduleModule} from "./modules/schedule/schedule.module";
import {LoginModule} from "./login/login/login.module";
import {DashboardModule} from "./components/dashboard/dashboard.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helpers/auth.interceptor";
import { CreateBloodRequestComponent } from './modules/hospital/create-blood-request/create-blood-request.component';
import {MatSelectModule} from "@angular/material/select";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { ManagerHolidaysComponent } from './manager-holidays/manager-holidays.component';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    ManagerHolidaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    HospitalModule,
    NgToastModule,
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
    ScheduleClient,
    FeedbackClient,
    ApplicationUserClient,
    authInterceptorProviders
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
