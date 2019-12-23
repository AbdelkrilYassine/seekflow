import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    user: Utilisateur = {
        name: '',
        type: null,
        email: '',
        password: '',
        notfication: true
    };
    name: string = "";
    email: string = "";
    password: string = "";
    confpassword: string = "";
    choix;
    constructor(private activatedRoute: ActivatedRoute, private userService: RegisterService,
        private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }
    showValue(event) {

        console.log(event.detail.value);
        this.choix = event.detail.value;

    }
    showToast(msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000
        }).then(toast => toast.present());
    }
    addUser() {
        if (this.verify_data() == true) {
            this.userService.addUser(this.user).then(() => {
                this.router.navigateByUrl('/home');
                this.showToast('Your proposition of registration has been sent :)');
            }, err => {
                this.showToast('There was a problem adding the proposition :(');
                console.log(err);
            });
        }
    }

    verify_data(): boolean {
        if (this.choix == "1" || this.choix == "2" || this.choix == "3") {
            if (this.name.length > 0 && this.email.length > 0 && this.password.length > 0) {
                if (this.password == this.confpassword) {
                    this.user = { name: this.name, type: this.choix, email: this.email, password: this.password, notfication:true }
                    return true;
                }
                else {
                    this.showToast('Confirm your password again please :(');
                    return false;
                }
            } else {
                this.showToast('One of the data is empty  :(');
                return false;
            }
        }
        else {
            this.showToast('Choose a type of profile  :(');
            return false;
        }
    }

}
