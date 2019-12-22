import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {


    projects: any[];



    constructor() {
    }

    ngOnInit() {
        this.loadproject()
    }


    loadproject() {
        this.projects = [
            {
                'nom': 'ionic',
                'client': 'yassine abdelkrim',
                'date': '12/02/2019',
                'etat': 'Doing'
            },
            {
                'nom': 'flutter',
                'client': 'yassine abdelkrim',
                'date': '01/07/2019',
                'etat': 'Doing'
            },
            {
                'nom': 'spring boot',
                'client': 'yassine abdelkrim',
                'date': '10/01/2019',
                'etat': 'Finished'
            },
            {
                'nom': 'dotnet core',
                'client': 'yassine abdelkrim',
                'date': '11/10/2019',
                'etat': 'Doing'
            },
            {
                'nom': 'laravel',
                'client': 'yassine abdelkrim',
                'date': '01/05/2019',
                'etat': 'Doing'
            },
            {
                'nom': 'angular',
                'client': 'ahmed',
                'date': '08/02/2019',
                'etat': 'Finished'
            },
            {
                'nom': 'Firebase',
                'client': 'ahmed',
                'date': '05/03/2019',
                'etat': 'Finished'
            }
        ];
        this.projects.sort(function compare(a, b) {

            const nomA = a.nom.toUpperCase();
            const nomB = b.nom.toUpperCase();

            let comparison = 0;
            if (nomA > nomB) {
                comparison = 1;
            } else if (nomA < nomB) {
                comparison = -1;
            }
            return comparison;
        });
    }

    separateletter(record, recordIndex, records) {
        if (recordIndex == 0) {
            return record.nom[0].toUpperCase();
        }

        let first_prev = records[recordIndex - 1].nom[0];
        let first_current = record.nom[0];

        if (first_prev != first_current) {
            return first_current.toUpperCase();
        }
        return null;
    }

    getItems(ev: any) {
        this.loadproject();
        const val = ev.target.value;
        if (val && val.trim() !== '') {
            this.projects = this.projects.filter((item) => {

                return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.client.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }


    }

    selectItem(val) {
        alert("You have selected = " + val.nom);
    }

    myHeaderFn(record, recordIndex, records) {


        if (recordIndex == 0) {
            return record.nom.toUpperCase();
        }

        let first_prev = records[recordIndex - 1].nom[0].toUpperCase();
        let first_current = record.nom[0].toUpperCase();

        if (first_prev != first_current) {
            return first_current;
        }
        return null;
    }



}
