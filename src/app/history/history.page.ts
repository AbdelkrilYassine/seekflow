import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
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
