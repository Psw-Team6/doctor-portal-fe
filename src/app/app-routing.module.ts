import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { RescheduleAppointmentComponent } from "./modules/schedule/reschedule-appointment/reschedule-appointment.component";
import {CreateScheduleComponent} from "./modules/schedule/create-schedule/create-schedule.component";
import {LoginComponent} from "./login/login.component";
import {DoctorGuard} from "./guards/doctor.guard";
import {SignOutComponent} from "./components/sign-out/sign-out.component";
import {ManagerGuard} from "./guards/manager.guard";
import {BloodUnitsComponent} from "./modules/hospital/blood-units/blood-units.component";
import {CreateBloodRequestComponent} from "./modules/hospital/create-blood-request/create-blood-request.component";
import {
  CreateBloodConsumptionComponent
} from "./modules/hospital/create-blood-consumption/create-blood-consumption.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate:[DoctorGuard]},
  { path: 'reschedule-appointment/:id', component: RescheduleAppointmentComponent,canActivate:[DoctorGuard]},
  { path: 'create-schedule', component: CreateScheduleComponent,canActivate:[DoctorGuard] },
  { path: 'blood-units', component: BloodUnitsComponent,canActivate:[DoctorGuard] },
  { path: 'create-blood-request', component: CreateBloodRequestComponent,canActivate:[DoctorGuard]},
  { path: 'create-blood-consumption', component: CreateBloodConsumptionComponent,canActivate:[DoctorGuard]},
  {path: '',component:LoginComponent},
  {path: 'sign-out',component:SignOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
