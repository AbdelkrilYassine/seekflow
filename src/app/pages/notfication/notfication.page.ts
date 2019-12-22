import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfication',
  templateUrl: './notfication.page.html',
  styleUrls: ['./notfication.page.scss'],
})
export class NotficationPage implements OnInit {
    boite = [];

    constructor() {
        this.loadBoiteNotif();
    }

  ngOnInit() {
  }

    loadBoiteNotif() {
        this.boite = [
            {
                'name': 'Yassine abdelkrim',
                'datetime': '3 hours',
                'body': 'Ive changed the task'
            },
            {
                'name': 'Yassine abdelkrim',
                'datetime': '2 minutes',
                'body': 'Ive changed the task'
            },
            {
                'name': 'achref farhani',
                'datetime': '1 day',
                'body': 'Ive changed the task'
            },
            {
                'name': 'Yassine abdelkrim',
                'datetime': '3 hours',
                'body': 'Ive changed the task'
            }
        ]
    }

    DeleteNotif(i) {
        alert("sssssss");
    }

}
