import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(public AccountService: AccountService) {}

  ngOnInit(): void {
    this.AccountService.CurrentUser$;
  }
  login() {
    console.log(this.model);
    this.AccountService.login(this.model).subscribe();
  }
  logout() {
    this.AccountService.logout();
  }
}
