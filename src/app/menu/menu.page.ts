import { Component, OnInit } from '@angular/core';
import { Router,RouterEvent, Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    pages = [{
        title: 'Main',
        url: '/menu/main',
        icon: 'home'
    },
    {
           title: 'Notfication',
            url: '/menu/notfication',
            icon: 'home'
    },
    {
        title: 'Projets',
        children: [
            {
                title: 'Ionic',
                url: '/menu/ionic',
                icon: 'logo-ionic'
            },
            {
                title: 'Flutter',
                url: '/menu/flutter',
                icon: 'logo-google'
            },
        ]
        },
        {
            title: 'Chat',
            url: '/menu/ionic',
            icon: 'md-text'
        },

        {
            title: 'Analytics',
            url: '/menu/ionic',
            icon: 'stats'
        },
        {
            title: 'Profile',
            url: '/menu/ionic',
            icon: 'person'
        },
        {
            title: 'Settings',
            url: '/menu/ionic',
            icon:'settings'
        }

    ];

    selectedPath = '';

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent) => {

            if (event && event.url) {
                this.selectedPath = event.url;
            }
        })

 
    }

  ngOnInit() {
  }

}
