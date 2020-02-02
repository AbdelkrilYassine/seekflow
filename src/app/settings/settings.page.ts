import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    userID: string;
    private sub: any;
    private Name: string = "";
    private Gender: string = "";
    private City: string = "";
    private Mobile: string = "";
    private Occupation: string = "";
    private LinkedIN: string = "";



    image = 'assets/icon/imageholder.jpg';
    upload: any;
    selectedValue2: string = "";
    selectedValue: string = "";
    private userDetails: Utilisateur;

    userUpdate: Utilisateur = {
        name: '',
        type: null,
        email: '',
        password: '',
        notfication: null,
        gender: '',
        city: '',
        mobile: '',
        occupation: '',
        linkedin: ''
    };
    private val: boolean = false;

    private userDetailsSubscription: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private camera: Camera, public loadingController: LoadingController, public alertController: AlertController, public afSG: AngularFireStorage, public toastCtrl: ToastController, private userService: RegisterService) {


    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

        });

        this.getuserInfo();
  }
    pagenotif() {
        this.router.navigateByUrl('/notfication');

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.userDetails != null) {
            this.userDetailsSubscription.unsubscribe();
        }
    }

    onChangeGender(s) {

        this.Gender = s.target.value;

    }

    onChangeCity(event) {

        this.City = event.target.value;

    }

     async updateUser() {
        if (this.Name != "" && this.Gender != "" && this.City != "" && this.Mobile != "" && this.Occupation != "" && this.LinkedIN != "") {



            if (this.userDetails != null) {

                this.userUpdate = {
                    name: this.Name,
                    type: this.userDetails.type,
                    email: this.userDetails.email,
                    password: this.userDetails.password,
                    notfication: Boolean(this.userDetails.notfication),
                    gender: this.Gender,
                    city: this.City,
                    mobile: this.Mobile,
                    occupation: this.Occupation,
                    linkedin: this.LinkedIN,               

                };

                
                
                if (this.val==true) {
                    const loading = await this.loadingController.create({
                        duration: 2000
                    });
                    await loading.present();

                    this.upload = this.afSG.ref('picturesProfile/' + this.userID).putString(this.image, 'data_url');
                    this.upload.then(async () => {

                        await loading.onDidDismiss();
                        this.image = 'assets/icon/imageholder.jpg';
                        this.userService.updateUser(this.userID, this.userUpdate).then( () => {
                            this.toastShow("Profile updated successfully! :) ");

                            this.init();
                        }, (err) => {
                            this.toastShow('Failed updating your profile :( ' + err);
                            this.init();
                        });

                    }, (err) => {
                        this.toastShow(err);
                        this.init();
                        this.image = 'assets/icon/imageholder.jpg';
                    }
                    );
                }
                else {
                    this.toastShow('Please choose a picture !');
                }
                

            } else {

                this.toastShow('...Try again');
            }

        }else {
            this.toastShow('Failed Data Syntax');
}
    }


    async openLibrary() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 80,
            targetHeight: 80,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        return await this.camera.getPicture(options);
    }

    async addPhoto() {
        const libraryImage = await this.openLibrary();
        this.image = 'data:image/jpg;base64,' + libraryImage;
        this.val = true;
    }
    /*

    async AddPhotoFireStorage(id,userU) {
        const loading = await this.loadingController.create({
            duration: 2000
        });
        await loading.present();

        this.upload = this.afSG.ref('picturesProfile/'+id).putString(this.image, 'data_url');
        this.upload.then(async () => {

            await loading.onDidDismiss();
            this.image = 'assets/icon/imageholder.jpg';
            this.userService.updateUser(id, userU).then(async () => {

                const alert = await this.alertController.create({
                    header: 'Successful',
                    message: 'Your Profile was updated :) ',
                    buttons: ['OK']
                });
                await alert.present();

                this.init();
            }, (err) => {
                this.toastShow('Failed updating your profile :( ' + err);
                this.init();
            });
            
        }, (err) => {
            this.toastShow(err);
            this.init();
            this.image = 'assets/icon/imageholder.jpg';
        }
        );
    }
    */
    async toastShow(message) {

        const toast = await this.toastCtrl.create({
            showCloseButton: true,
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    init() {

        this.Name = "";
        this.Gender = "";
        this.City = "";
        this.Mobile = "";
        this.Occupation = "";
        this.LinkedIN = "";
        this.selectedValue2 = '';
        this.selectedValue = '';
    }

    getuserInfo() {
        if (this.userID != null) {
            this.userDetailsSubscription = this.userService.getUser(this.userID).subscribe(u => {
                if (u) {
                    this.userDetails = u;
                } else {
                    console.log("Failed");
                }
            })
        }
    }

    updateProfile(id,userU) {

        this.userService.updateUser(id, userU).then(async () => {

            const alert = await this.alertController.create({
                header: 'Successful',
                message: 'Your Profile was updated :) ',
                buttons: ['OK']
            });
            await alert.present();

            this.init();
        }, (err) => {
            this.toastShow('Failed updating your profile :( ' + err);
            this.init();
        });
    }
}
