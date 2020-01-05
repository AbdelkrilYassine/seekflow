import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent,  ActivatedRoute} from '@angular/router';
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
    pages = [{
        title: 'Dashboard',
        url: '/menu/menupage/main',
        icon: 'easel'
    },
    {
       title: 'Profile',
        url: '/menu/menupage/profile',
       icon: 'person'
    },
    {
       title: 'Settings',
        url: '/menu/menupage/settings',
       icon: 'settings'
    },
    {
       title: 'History',
       children: [
            {
               title: 'Projects',
               url: '/menu/menupage/history',
               icon: 'archive'
            }

        ]
        }
     ];

    selectedPath = '';
    userID: string;
    private subscription: Subscription;
    user: Utilisateur;

    constructor(private route: ActivatedRoute, private router: Router, public afAuth: AngularFireAuth, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private userService: RegisterService) {
        this.router.events.subscribe((event: RouterEvent) => {

            if (event && event.url) {
                this.selectedPath = event.url;
            }
        })

        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.userID = JSON.parse(params.special);
            }
        }); 
    }

    ngOnInit() {
        this.loadUser();
  }

    ionViewDidEnter() {
        this.loadUser();
    }
    ionViewWillEnter() {
        this.loadUser();
    }
    loadUser() {
        if (this.userID != null) {
            this.subscription = this.userService.getUser(this.userID).subscribe(u => {
                this.user = u;

            });;
            
        }
    }

    Change_Toggle(event,id) {

        this.userService.updateUserNotif(id, event.detail.checked);
      
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
     logout() {

         if (this.userService.logout) {
             this.router.navigate(['/home'])
             this.toastShow('Sign-out successful :) ');
         } else {
             this.toastShow('Error logout :( ');
         }
           
     }

    ngOnDestroy() {
        this.subscription.unsubscribe();
  
    }
}
