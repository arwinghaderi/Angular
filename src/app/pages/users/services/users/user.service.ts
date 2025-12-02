import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}
@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersState = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersState.asObservable();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<{ users: IUser[] }>("https://dummyjson.com/users").subscribe({
      next: (res) => {
        const current = this.usersState.value;
        const merged = [...res.users, ...current.filter((u) => u.id >= 1000)];

        const sorted = merged.sort((a, b) => b.id - a.id);

        this.usersState.next(sorted.slice(0, 4));
      },
      error: () => alert("خطا در گرفتن کاربران"),
    });
  }

  addUser(user: IUser) {
    const current = this.usersState.value;
    const fakeUser = { ...user, id: Date.now() };

    const updated = [fakeUser, ...current];

    this.usersState.next(updated.slice(0, 4));
  }
}
