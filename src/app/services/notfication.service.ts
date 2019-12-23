import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument} from '@angular/fire/firestore';
import { map,take} from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface Notfication {
    id?: string,
    src: string,
    dest: string,
    body: string,
    date: Date

}

@Injectable({
  providedIn: 'root'
})
export class NotficationService {

    private notifications: Observable<Notfication[]>;
    private notifCollection: AngularFirestoreCollection<Notfication>;
    private NotifDoc: AngularFirestoreDocument<Notfication>;

    constructor(private afs: AngularFirestore) {
        this.notifCollection = this.afs.collection('Notfications');
        this.notifications = this.notifCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Notfication;
                    const id = a.payload.doc.id;
                    return  { id, ...data };
                });
            })
        );

    }

    getNotifById(id: string): Observable<Notfication> {
        return this.notifCollection.doc<Notfication>(id).valueChanges().pipe(
            take(1),
            map(user => {
                user.id = id;
                return user
            })
        );
    }

    addNotif(notif: Notfication): Promise<DocumentReference> {
        return this.notifCollection.add(notif);
    }

    getmyNotif(src: string): Observable<Notfication[]> {
        this.notifCollection = this.afs.collection('Notfications', ref => {
            return ref.where('dest', '==', src)
        });
        return this.notifications = this.notifCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Notfication;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }    
    getAllNotif() {
        return this.notifications;
    }
    deleteNotif(notif: Notfication): Promise<void> {
        this.NotifDoc = this.afs.doc('/Notfications/'+notif.id);
        return this.NotifDoc.delete();
    }
}
