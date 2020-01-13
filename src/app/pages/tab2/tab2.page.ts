import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
    userID: string;
    private sub: any;
    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
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
}
