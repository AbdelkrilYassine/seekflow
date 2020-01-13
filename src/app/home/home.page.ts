import { Component } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    email: string = "";
    password: string = "";
    userID: string;
    private user;
    constructor(private router: Router, private userService: RegisterService,
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
                    handler: async (data) => {

                        if (this.validateEmail(data.email)) {

                          var auth = this.afAuth.auth;
                            auth.sendPasswordResetEmail(data.email)
                                .then(() => this.toastShow('Email was sended successfully.'))
                                .catch((error) => this.toastShow(error));

                                
                        }

                         else {
                            this.toastShow('Email is not valid : ( ' + data.email);
                            
                        }

                    }
                }
            ]
        });

        await alert.present();
    }


    async login() {
        const { email, password } = this
        try {
            const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
            
            this.user = this.userService.getUserDetails(email, password).subscribe(u => {
                if (u) {
                    this.userID = u.id;

                    let navigationExtras: NavigationExtras = {
                        queryParams: {
                            special: JSON.stringify(u.id)
                        }
                    };
                    this.router.navigate(['/menu/' + this.userID + '/menupage/main/' + this.userID + '/homepage/tab1/' + this.userID]);//navigationExtras
                } else {
                    console.log("Failed");
                }
            })
                        
           
        } catch (err) {
            console.dir(err);
            if (err.code = "auth/user-not-found") {
                console.log("user not found");
            }

        }
    }

    resetpassword(email) {
        var auth = this.afAuth.auth;
        var emailAddress = email;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
    }
    resetPassword(email: string) {
        var auth = this.afAuth.auth;
        return auth.sendPasswordResetEmail(email.toString())
            .then(() => console.log("email sent"))
            .catch((error) => console.log(error))
    }

    validateEmail(data):boolean {
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(data)) {
            return true;
        } else {
            return false;
        }
    }

    async toastShow(message) {


        const loader = await this.loadingCtrl.create({
            duration: 2000
        });

        loader.present();

        loader.onWillDismiss().then(async l => {
            const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: message,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        });
            
    }
}
