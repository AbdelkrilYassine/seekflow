import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    userID: string;
    private sub: any;
    private subscription: Subscription;
    user: Utilisateur;
    constructor(private router: Router, private route: ActivatedRoute, private userService: RegisterService) {
    }

    ngOnInit() {
        this.getParam();
        if (this.userID != null) {
            this.loadUser();
        }        
        
    }

    ionViewDidEnter() {
        this.getParam();
        if (this.userID != null) {
            this.loadUser();
        }   
    }
    ionViewWillEnter() {
        this.getParam();
        if (this.userID != null) {
            this.loadUser();
        }   
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.userID) {
            this.subscription.unsubscribe();

        }
    }

    getParam() {
        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

        });

    }

    loadUser() {
        if (this.userID != null) {
            this.subscription = this.userService.getUser(this.userID).subscribe(u => {
                this.user = u;

            });;

        }
    }
}
