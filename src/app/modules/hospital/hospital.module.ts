import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/material/material.module";
import { CreateRoomComponent } from "./create-room/create-room.component";
import { RoomDetailComponent } from "./room-detail/room-detail.component";
import { RoomsComponent } from "./rooms/rooms.component";
import { UpdateRoomComponent } from "./update-room/update-room.component";
import { FeedbackComponent } from './feedback/feedback.component';
import { BloodbankRegistrationComponent } from './bloodbank-registration/bloodbank-registration.component';
import { BloodBankChangePasswordComponent } from './blood-bank-change-password/blood-bank-change-password.component';


const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/add', component: CreateRoomComponent },
  { path: 'rooms/:id', component: RoomDetailComponent },  
  { path: 'rooms/:id/update', component: UpdateRoomComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'bloodBank/add', component: BloodbankRegistrationComponent},
  { path: 'bloodBank/changePassword', component: BloodBankChangePasswordComponent}
];

@NgModule({
  declarations: [
    RoomsComponent,
    RoomDetailComponent,
    CreateRoomComponent,
    UpdateRoomComponent,
    FeedbackComponent,
    BloodbankRegistrationComponent,
    BloodBankChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class HospitalModule { }
