import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from "./user-list/user-list.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { ReactiveFormsModule } from "@angular/forms";

import { NbCardModule } from "@nebular/theme";
import { NbInputModule } from "@nebular/theme";
import { NbButtonModule } from "@nebular/theme";
import { NbSelectModule } from "@nebular/theme";

@NgModule({
  declarations: [UserListComponent, UserAddComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UsersRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
  ],
})
export class UsersModule {}
