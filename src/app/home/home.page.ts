import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    email: string = "";
    password: string = "";
    constructor(private router: Router,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController, public afAuth: AngularFireAuth
        ) {}
       


    Home() {

        this.router.navigate(['main'])
    }

    async forgotPass() {
        const alert = await this.alertCtrl.create({
            header: 'Forgot Password?',
            message: 'Enter you email address to send a reset link password.',
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Confirm',
                    handler: async () => {
                        const loader = await this.loadingCtrl.create({
                            duration: 2000
                        });

                        loader.present();
                        loader.onWillDismiss().then(async l => {
                            const toast = await this.toastCtrl.create({
                                showCloseButton: true,
                                message: 'Email was sended successfully.',
                                duration: 3000,
                                position: 'bottom'
                            });

                            toast.present();
                        });
                    }
                }
            ]
        });

        await alert.present();
    }


    async login() {
        const { email, password } = this
        try {

            const res = await this.afAuth.auth.signInWithEmailAndPassword(email,password);
        } catch (err) {
            console.dir(err);
            if (err.code = "auth/user-not-found") {
                console.log("user not found");
            }

        }
    }
}
