import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, ActivatedRoute} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';
import {  Subscription} from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    pages = [
     ];

    selectedPath = '';
    userID: string;
    private subscription: Subscription;
    user: Utilisateur;
    private sub: any;
    constructor(private route: ActivatedRoute, private router: Router, public afAuth: AngularFireAuth, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private userService: RegisterService) {
       /* this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.userID = JSON.parse(params.special);
            }
        }); */


    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

        });
        this.loadUser();
        this.loadPages(this.userID);
  }

    ionViewDidEnter() {
        this.loadUser();
        this.loadPages(this.userID);
    }
    ionViewWillEnter() {
        this.loadUser();
        this.loadPages(this.userID);
    }
    loadUser() {
        if (this.userID != null) {
            this.subscription = this.userService.getUser(this.userID).subscribe(u => {
                this.user = u;

            });;
            
        }
    }

    loadPages(id) {
        if (id != null && id != '') {
            this.pages = [{
                title: 'Dashboard',
                url: '/menu/' + id + '/menupage/main/' + id + '/homepage/tab1/' + id,
                icon: 'easel'
            },
            {
                title: 'Profile',
                url: '/menu/'+id+'/menupage/profile/'+id,
                icon: 'person'
            },
            {
                title: 'Settings',
                url: '/menu/'+id+'/menupage/settings/'+id,
                icon: 'settings'
            },
            {
                title: 'History',
                icon: 'archive',
                children: [
                    {
                        title: 'Projects',
                        url: '/menu/'+id+'/menupage/history/'+id,
                        icon: 'albums'
                    }

                ]
            }
            ];

            this.router.events.subscribe((event: RouterEvent) => {

                if (event && event.url) {
                    this.selectedPath = event.url;

                }
            })

        }

    }
    Change_Toggle(event,id) {

        this.userService.updateUserNotif(id, event.detail.checked);
      
    }



    async toastShow(message) {


        const loader = await this.loadingCtrl.create({
            duration: 1000
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
     logout() {

         if (this.userService.logout) {
             
             this.toastShow('Sign-out successful :) ');
             this.router.navigate(['/home'])
         } else {
             this.toastShow('Error logout :( ');
         }
           
     }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.subscription.unsubscribe();
  
    }


    
}
