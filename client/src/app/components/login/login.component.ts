import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;
  constructor(private AccountService: AccountService) {}

  ngOnInit(): void {}
  login() {
    console.log(this.model);
    this.AccountService.login(this.model).subscribe(() => {
      this.loggedIn = true;
    });
  }
  logout() {
    this.AccountService.logout();
    this.loggedIn = false;
  }
  getCurrentUser() {
    this.AccountService.CurrentUser$.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }
}
