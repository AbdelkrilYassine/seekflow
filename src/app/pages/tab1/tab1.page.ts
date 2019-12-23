import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService, Project, Task } from 'src/app/services/projet.service';
import { Observable } from 'rxjs'
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
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
        feedback: '',
        ROI: 0,
        TasksFollow: 0,
        ProjectFollow: 0,
        CreatedByApp: true,
        etat: '',
    };

    task: Task = {
        name: '',
        difficulty: '',
        progress: '',
        employee: []
    };
    projects: Project[] = [];



    constructor(private router: Router, private projetService: ProjetService, private toastCtrl: ToastController, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {


        this.loadproject();
    }
    pagenotif() {
        this.router.navigateByUrl('/notfication');

    }

    loadproject() {

        this.proj = {
            name: 'Firebase',
            chef: 'F6Js4HwdwZpuRna3HNxy',
            client: 'F6Js4HwdwZpuRna3HNxy',
            dev_team: ['F6Js4HwdwZpuRna3HNxy', 'F6Js4HwdwZpuRna3HNxy', 'F6Js4HwdwZpuRna3HNxy'],
            deadline: '10/10/10',
            description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            budget: 666,
            Tasks: [
                {
                    name: 'API REST',
                    difficulty: 'un peu',
                    progress: '666',
                    employee: ['F6Js4HwdwZpuRna3HNxy', 'F6Js4HwdwZpuRna3HNxy', 'F6Js4HwdwZpuRna3HNxy']

                },
                {
                    name: 'API Spring',
                    difficulty: 'moyenne',
                    progress: '777',
                    employee: ['F6Js4HwdwZpuRna3HNxy', 'F6Js4HwdwZpuRna3HNxy', 'F6Js4HwdwZpuRna3HNxy']

                },

            ],
            feedback: '50%',
            ROI: 666,
            TasksFollow: 66,
            ProjectFollow: 66,
            CreatedByApp: true,
            etat: 'en cours'

        };
       // this.projetService.addProjet(this.proj);
        this.projetService.getmyProjects('chef', 'F6Js4HwdwZpuRna3HNxy').subscribe(p => {
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
        let data = JSON.stringify(val);
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



}
