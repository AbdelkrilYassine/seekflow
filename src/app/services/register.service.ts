import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Utilisateur {
    id?: string,
    type: number,
    name: string,
    email: string,
    password: string
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private utilisateurs: Observable<Utilisateur[]>;
    private userCollection: AngularFirestoreCollection<Utilisateur>;

    constructor(private afs: AngularFirestore) {
        this.userCollection = this.afs.collection<Utilisateur>('Utilisateurs');
        this.utilisateurs = this.userCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }

    getUsers(): Observable<Utilisateur[]> {
        return this.utilisateurs;
    }

    getUser(id: string): Observable<Utilisateur> {
        return this.userCollection.doc<Utilisateur>(id).valueChanges().pipe(
            take(1),
            map(user => {
                user.id = id;
                return user
            })
        );
    }

    addUser(user: Utilisateur): Promise<DocumentReference> {
        return this.userCollection.add(user);
    }

    updateUser(user: Utilisateur): Promise<void> {
        return this.userCollection.doc(user.id).update({ name: user.name, email: user.email,password:user.password,type:user.type});
    }

    deleteUser(id: string): Promise<void> {
        return this.userCollection.doc(id).delete();
    }
}
