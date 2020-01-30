import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ProjetService, Project, STATUS} from 'src/app/services/projet.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page implements OnInit {
    userID: string;
    private sub: any;
   image = 'assets/icon/projectholder.png';
    upload: any;


    name: string = "";
    client: string = "";
    description: string = "";
    budget: string="";
    datestart: string = "";
    dateend: string = "";

    tomorrow: Date = new Date();
    aftertomorrow: Date = new Date();

    proj: Project = {
        name: '',
        chef: '',
        client: '',
        dev_team: [],
        deadline: '',
        description: '',
        budget: 0,
        Tasks: [],
        feedback: 0,
        ROI: 0,
        TasksFollow: 0,
        ProjectFollow: 0,
        CreatedByApp: true,
        etat: STATUS.Pending,
        imgPath:"",
    };
    private val: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute, private camera: Camera, public loadingController: LoadingController, public alertController: AlertController, public afSG: AngularFireStorage, public toastCtrl: ToastController, private projetService: ProjetService) { }

    ngOnInit() {
        this.SetDates();
        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

        });
        console.log(this.userID)
  }

    ionViewDidEnter() {
        this.ngOnInit();

    }
    ionViewWillEnter() {
        this.ngOnInit();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    pagenotif() {
        this.router.navigateByUrl('/notfication');

    }

    async openLibrary() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 80,
            targetHeight: 80,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        return await this.camera.getPicture(options);
    }

    async addPhoto() {
        const libraryImage = await this.openLibrary();
        this.image = 'data:image/jpg;base64,' + libraryImage;
        this.val = true;
    }



    async toastShow(message) {

            const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: message,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
       
    }

   async addProjet() {


        if (this.name != "" && this.client != "" && this.description != "" && Number(this.budget )> 0 && this.VerifDate() && this.userID !=null) {

              

            this.proj = {
                name: this.name,
                chef: this.userID,
                client: this.client,
                dev_team: [],
                deadline: this.dateend,
                description: this.description,
                budget: Number(this.budget),
                Tasks: [],
                feedback: 0,
                ROI: 0,
                TasksFollow: 0,
                ProjectFollow: 0,
                CreatedByApp: true,
                etat: STATUS.Pending,
                imgPath: this.userID + this.client+this.name
            };

            if (this.val == true) {

                const loading = await this.loadingController.create({
                    duration: 2000
                });
                await loading.present();

                this.upload = this.afSG.ref('picturesProject/' + this.userID).putString(this.image, 'data_url');
                this.upload.then(async () => {

                    await loading.onDidDismiss();
                    this.image = 'assets/icon/imageholder.jpg';
                    this.projetService.addProjet(this.proj).then(() => {

                        this.toastShow("Project added successfully! :) ");
                        this.init();
                    }, (err) => {
                            this.toastShow('Failed adding the project :( ' + err);
                            this.init();
                    });


                }, (err) => {
                    this.toastShow(err);
                    this.init();
                    this.image = 'assets/icon/projectholder.png';
                }
                );
            }
            else {
                this.toastShow('Please choose a picture !');
            }



        } else {
            this.toastShow('Failed Data Syntax');
        }
        

    }

    VerifDate(): boolean {
        let s = new Date(this.datestart);
        let d = new Date(this.dateend);

        if (s >= d) {
            this.toastShow('Given date is greater or equal to the deadline date :( ');
            return false;
        } else {
            if (s < this.tomorrow || d <= this.tomorrow) {
                this.toastShow('Given date is not greater than the current date :(');
                return false;
            } else {
                return true;
            }
        }
    }

 
    SetDates() {

        this.tomorrow.setDate(this.tomorrow.getDate());
        this.aftertomorrow.setDate(this.tomorrow.getDate() + 1);
        this.datestart = this.tomorrow.toISOString();
        this.dateend = this.aftertomorrow.toISOString();
    }

    DateStartDisplay(ev) {
        

    }

    init() {

        this.name = "";
        this.client= "";
        this.description = "";
        this.budget="";
        this.datestart="";
        this.dateend="";
    }

    DateDeadlineDisplay(ev) {
       

    }
}
