import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceMock } from 'src/app/services/login.service';
/* import { LoginService } from 'src/app/services/login.service'; */

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  @Input() type!: string;
  isMenuVisible = false;
  currentDate: string;

  constructor(private router: Router, private loginService: LoginServiceMock) {
    const date = new Date();
    this.currentDate = date.toLocaleDateString('pt-BR');
  }

  setUser() {
    let user = '';
    if (this.loginService.getUser()) {
      user = this.loginService.getUser()!;
    } else {
      user = '../../../assets/user-avatar.jpg';
    }

    return user;
  }

  goToHome() {
    this.router.navigate(['']);
  }
  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
