import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	model: any = {};
	photoUrl: string;

	constructor(public authService: AuthService, private alertifyService: AlertifyService, private router: Router) {}

	ngOnInit() {
		this.authService.currentPhotoUrl.subscribe(photoUrl => (this.photoUrl = photoUrl));
	}

	login() {
		this.authService.login(this.model).subscribe(
			() => {
				this.alertifyService.success('Logged in successfully');
				this.router.navigate(['/members']);
			},
			error => {
				this.alertifyService.error(error);
			},
		);
	}

	loggedIn(): boolean {
		return this.authService.loggedIn();
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.authService.decodedToken = null;
		this.authService.currentUser = null;
		this.alertifyService.message('Logged out');
		this.router.navigate(['/home']);
	}
}
