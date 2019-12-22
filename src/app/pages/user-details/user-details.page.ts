import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

    user: Utilisateur = {
        name: '',
        type: null,
        email: '',
        password: ''
    };

    constructor(private activatedRoute: ActivatedRoute, private userService: RegisterService,
        private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

    ionViewWillEnter() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.userService.getUser(id).subscribe(u => {
                this.user = u;
            });
        }
    }

    addUser() {
        this.userService.addUser(this.user).then(() => {
            this.router.navigateByUrl('/user-list');
            this.showToast('User added');
        }, err => {
                this.showToast('There was a problem adding the user :(');
                console.log(err);
        });
    }

    deleteUser() {
        this.userService.deleteUser(this.user.id).then(() => {
            this.router.navigateByUrl('/');
            this.showToast('user deleted');
        }, err => {
            this.showToast('There was a problem deleting the user :(');
        });
    }

    updateUser() {
        this.userService.updateUser(this.user).then(() => {
            this.showToast('User updated');
        }, err => {
                this.showToast('There was a problem updating the User :(');
        });
    }

    showToast(msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000
        }).then(toast => toast.present());
    }
}
