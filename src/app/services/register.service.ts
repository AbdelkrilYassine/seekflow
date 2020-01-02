import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Utilisateur {
    id?: string,
    type: number,
    name: string,
    email: string,
    password: string,
    notfication:boolean
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private utilisateurs: Observable<Utilisateur[]>;
    private userCollection: AngularFirestoreCollection<Utilisateur>;
    private userDoc: AngularFirestoreDocument<Utilisateur>;
    private user: Utilisateur;

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
        return this.userCollection.doc(user.id).update({ name: user.name, email: user.email, password: user.password, type: user.type, notfication: user.notfication });
    }

    deleteUser(id: string): Promise<void> {
        return this.userCollection.doc(id).delete();
    }

    getUserDetails(email: string, password: string):Observable<Utilisateur> {
        /*
        this.userCollection = this.afs.collection<Utilisateur>('Utilisateurs',
            ref => ref.where('email', '==', "yassine_abdelkrim@yahoo.fr").where('password', '==', "123456")
                .limit(1));

         this.userCollection.valueChanges()
            .pipe(
                map(users => {
                    const user = users[0];
                    return user;
                })
            );
            */

        return this.afs.collection<Utilisateur>('Utilisateurs', ref => ref.where('email',
            '==', email))
            .snapshotChanges()
            .pipe(map(users => {
                const user = users[0];
                if (user) {
                    const data = user.payload.doc.data() as Utilisateur;
                    const id = user.payload.doc.id;
                    return { id, ...data };
                }
                else {
                    return null;
                }
            }));
 
        /*
        if (x != null) {
            return x;
        } else {
            return "Empty"
        }

*/
    
 
        //yassine_abdelkrim@yahoo.fr
    }
}
