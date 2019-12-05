import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BackofficeComponent } from '../backoffice/backoffice.component';
import { Routes } from '../../config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate([`/${Routes.LOGIN}`]);
  }

}
