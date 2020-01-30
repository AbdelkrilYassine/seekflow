import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

export interface Suggestion {
    id?: string,
    client: string,
    name: string,
    budget: number,
    datestart: string ,
    dateend: string ,
    taken: string,
    path_file: string,
}
@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

    private files: Observable<Suggestion[]>;
    private suggCollection: AngularFirestoreCollection<Suggestion>;
    private suggfDoc: AngularFirestoreDocument<Suggestion>;

    constructor(private afs: AngularFirestore) {

        this.suggCollection = this.afs.collection('Suggestion');
        this.files = this.suggCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Suggestion;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );

    }

    getAllSuggestions() {
        return this.files;
    }


    getSuggById(id: string): Observable<Suggestion> {
        return this.suggCollection.doc<Suggestion>(id).valueChanges().pipe(
            take(1),
            map(p => {
                p.id = id;
                return p
            })
        );
    }

    addSugg(p: Suggestion): Promise<DocumentReference> {
        return this.suggCollection.add(p);
    }

    deleteSuggestion(s: Suggestion): Promise<void> {

            this.suggfDoc = this.afs.doc('/Suggestion/' + s.id);
            return this.suggfDoc.delete();


    }

    getAvailableSugg(): Observable<Suggestion[]> {
        this.suggCollection = this.afs.collection('Suggestion', ref => {
            return ref.where('taken', '==', 'free').orderBy("file_name", "asc")
        });
        return this.files = this.suggCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Suggestion;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }
}
