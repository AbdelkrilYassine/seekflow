import { Component, OnInit } from '@angular/core';
import { NotficationService, Notfication} from 'src/app/services/notfication.service';
import { Observable } from 'rxjs'
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-notfication',
    templateUrl: './notfication.page.html',
    styleUrls: ['./notfication.page.scss'],
})
export class NotficationPage implements OnInit {
    notif: Notfication = {
        src: '',
        dest: '',
        body: '',
        date: null,
    };

    
    myDate: String = new Date().toISOString();
    private boite: Notfication[];

    constructor(private notifService: NotficationService, private toastCtrl: ToastController, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.notif = {
            src: 'aymen', dest: 'yassine', body: 'tu peux me m affecter une tache', date: new Date()
        };

       // this.notifService.addNotif(this.notif);
        this.notifService.getmyNotif('yassine').subscribe(notifs => {
            this.boite = notifs;
        })

    }


    DeleteNotif(event, item) {
          this.notifService.deleteNotif(item).then(() => {
          this.showToast('Notification deleted');
        }, err => {
            this.showToast('There was a problem deleting the notfication :(');
        });
    }

    showToast(msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000
        }).then(toast => toast.present());
    }

}
    


