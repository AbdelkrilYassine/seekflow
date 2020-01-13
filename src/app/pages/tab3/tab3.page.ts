import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
    userID: string;
    private sub: any;
    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {


            this.sub = this.route.params.subscribe(params => {
                this.userID = params['id']

            });
        console.log(this.userID)
        }
    
    pagenotif() {
        this.router.navigateByUrl('/notfication');

    }

ngOnDestroy() {
    this.sub.unsubscribe();
}

    ionViewDidLoad() {
    }
}
