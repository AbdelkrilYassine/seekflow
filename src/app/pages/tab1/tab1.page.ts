import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetService, Project, Task, STATUS, DIFFICULTY } from 'src/app/services/projet.service';
import { Observable } from 'rxjs'
import { ToastController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

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
        imgPath:""
    };

    task: Task = {
        name: '',
        difficulty: DIFFICULTY.PENDING,
        progress: 0,
        employee: [],
        status: STATUS.Pending
    };
    projects: Project[] = [];
    userID: string;
    private sub: any;
    private userSub: Subscription;
    private subProj: Subscription;
    private subProj2: Subscription;
    private typeUser: string = "";
    private val: string = "";
    constructor(private userService:RegisterService,private router: Router, private route: ActivatedRoute, private projetService: ProjetService, private toastCtrl: ToastController, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

        });
        this.userSub = this.userService.getUser(this.userID).subscribe((u) => {
            if (u) {
                if (u.type == "1") {
                    this.typeUser = "client";
                    this.loadproject();
                } else if (u.type == "2") {
                    this.typeUser = "chef";
                    this.loadproject();
                } else {
                    this.typeUser = "developper";
                    this.loadproject();
                }
            }

        })
        this.val = "";
         
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
     
    loadproject() {
        console.log(this.typeUser);
        this.subProj = this.projetService.getmyProjects(this.typeUser, this.userID).subscribe(p => {
                this.projects = p;
             
            })
        


    }

    getItems(ev: any) {
        const val = ev.target.value;
        if (val && val.trim() !== '') {
            this.projects = this.projects.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.client.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        } else {
            this.loadproject();
        }


    }

    selectItem(val) {
        // this.router.navigate(['/detailsprojet', val]);
        let data = JSON.stringify(val.id);
        this.router.navigate(['/detailsprojet', data]);
    }

    

    myHeaderFn(record, recordIndex, records) {

            if (recordIndex == 0) {
                return record.name[0].toUpperCase();
            }

            let first_prev = records[recordIndex - 1].name[0].toUpperCase();
            let first_current = record.name[0].toUpperCase();

            if (first_prev != first_current) {
                return first_current;
            }
            return null;


    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.userSub.unsubscribe();
        this.subProj.unsubscribe();

    }


}
