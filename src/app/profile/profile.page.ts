import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProjetService} from 'src/app/services/projet.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    userID: string;
    private sub: any;
    private userDetails: Utilisateur;
    private userDetailsSubscription: Subscription;
    private imageSourceSubscription: Subscription;
    private projetsub: Subscription;
    private imgsource: string = "";
    nbs: number;



    constructor(private router: Router, private route: ActivatedRoute, private userService: RegisterService, public afSG: AngularFireStorage, private projetService: ProjetService) {

    }

    ngOnInit() {

            this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

            });

        this.userDetailsSubscription = this.userService.getUser(this.userID).subscribe(u => {
            if (u) {
                this.userDetails = u;
                
               
            } else {
                console.log("Failed");
            }
        })

       

        this.imageSourceSubscription = this.afSG.ref('picturesProfile/' + this.userID).getDownloadURL().subscribe(url => {

            if (url) {
                this.imgsource = url;

            } else {
                console.log("Failed Display photo");
            }
        });
        if (this.userID != null) {
            this.projetsub = this.projetService.countmyProjects(this.userID).subscribe(result => {

                this.nbs=result.length;
            });
        }
    }

    ionViewDidEnter() {
        this.ngOnInit();
      

    }
    ionViewWillEnter() {
        this.ngOnInit();
        
    }

  pagenotif() {
      this.router.navigateByUrl('/notfication');


  }


    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.userDetails != null) {
            this.userDetailsSubscription.unsubscribe();
        }
        if (this.imgsource!="" && this.imgsource!=null){
            this.imageSourceSubscription.unsubscribe();
        }
        if (this.userDetails != null) {
            this.projetsub.unsubscribe();
        }
    }

        
    
}
