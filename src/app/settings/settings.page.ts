import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    userID: string;
    private sub: any;
    constructor(private router: Router, private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

        });
  }
    pagenotif() {
        this.router.navigateByUrl('/notfication');

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
