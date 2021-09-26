import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  model: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  loginForm: FormGroup;

  constructor(
    public AccountService: AccountService,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.AccountService.CurrentUser$;
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  login() {
    this.model = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };
    console.log(this.model);
    this.AccountService.login(this.model).subscribe(
      () => {
        this.isLoggedIn = true;
      },
      () => {
        this.isLoginFailed = true;
      }
    );
  }
  logout() {
    this.AccountService.logout();
  }
  ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../../../assets/login.js';
    this.elementRef.nativeElement.appendChild(s);
  }
}
