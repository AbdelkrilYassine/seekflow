import { Component, OnInit } from '@angular/core';
import { RegisterService, Utilisateur } from 'src/app/services/register.service';
import { Observable } from 'rxjs'
@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.page.html',
    styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

    private users: Observable<Utilisateur[]>;

    constructor(private userService: RegisterService) { }

    ngOnInit() {
        this.users = this.userService.getUsers();
    }
}
