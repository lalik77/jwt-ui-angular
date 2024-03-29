import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  login(loginForm: NgForm) {
    //console.log('Form is submitted');
    //console.log(loginForm.value);

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response.user.role);
        //console.log(response.jwtToken);
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          console.log(role === 'Admin');
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
          console.log(role === 'Admin');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
