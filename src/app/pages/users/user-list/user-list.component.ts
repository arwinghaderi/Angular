import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/users/user.service";

@Component({
  selector: "ngx-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  users$ = this.userService.users$;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers();
    console.log(this.users$);
  }
}
