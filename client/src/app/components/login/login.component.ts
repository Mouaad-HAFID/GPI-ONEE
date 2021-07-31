import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private AccountService: AccountService) {}

  ngOnInit(): void {}
  login() {
    console.log(this.model);
    this.AccountService.login(this.model).subscribe((res) => {
      console.log(res);
    });
  }
}
