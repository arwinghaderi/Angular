import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService, IUser } from "../services/users/user.service";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent {
  userForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: NbToastrService
  ) {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      phone: ["", [Validators.required, Validators.pattern(/^09\d{9}$/)]],
      email: ["", [Validators.required, Validators.email]],
      gender: [""],
      username: [""],
      image: [""],
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.userForm.patchValue({ image: file.name });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: IUser = this.userForm.value;
      this.userService.addUser(newUser);
      this.toastrService.success("کاربر با موفقیت ثبت شد!", "موفقیت");
      this.router.navigate(["/pages/users/list"]);
    } else {
      this.toastrService.danger(
        "لطفاً نام، نام خانوادگی و موبایل را پر کنید",
        "خطا"
      );
    }
  }
}
