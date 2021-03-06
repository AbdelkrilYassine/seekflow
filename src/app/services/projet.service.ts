import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { firestore} from 'firebase';
import * as firebase from 'firebase';

export interface Project {
    id?: string,
    name: string,
    chef: string,
    client:string,
    dev_team: string [],
    deadline: string,
    description: string,
    budget: number,
    Tasks: Task[],
    feedback: number,
    ROI: number,
    TasksFollow: number,
    ProjectFollow: number,
    CreatedByApp: boolean,
    etat: STATUS,
    imgPath: string;

}

export interface Task {

    name: string,
    difficulty: DIFFICULTY,
    progress: number,
    employee: string[],
    status: STATUS

}
export enum STATUS {
    Pending="Pending",
    Completed="Completed",
    In_Progress="In Progress",
    On_Hold="On Hold",
}

export enum DIFFICULTY {
    EXTREMELY_EASY = "Extremely Easy",
    VERY_EASY = "Very Easy",
    A_BIT_DIFFICULT = "A Bit Difficult",
    DIFFICULT = "Difficult",
    VERY_DIFFICULT = "Very Difficult",
    EXTREMELY_DIFFICULT = "Extremely Difficult",
    PENDING="PENDING"

}


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

    private projets: Observable<Project[]>;
    private projCollection: AngularFirestoreCollection<Project>;
    private NotifDoc: AngularFirestoreDocument<Project>;
    private pdevs: Observable<Project[]>;
    constructor(private afs: AngularFirestore) {

        this.projCollection = this.afs.collection('Projets');
        this.projets = this.projCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Project;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }


    getProjetById(id: string): Observable<Project> {
        return this.projCollection.doc<Project>(id).valueChanges().pipe(
            take(1),
            map(p => {
                p.id = id;
                return p
            })
        );
    }

    addProjet(p: Project): Promise<DocumentReference> {
        return this.projCollection.add(p);
    }

    getmyProjects(attribut: string, type: string): Observable<Project[]> {

        if (attribut=="chef" || attribut=="client") {
            this.projCollection = this.afs.collection('Projets', ref => {
                return ref.where(attribut, '==', type).orderBy("name", "asc")
            });
            return this.projets = this.projCollection.snapshotChanges().pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Project;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    });
                })
            );
        } else {
            this.projCollection = this.afs.collection('Projets', ref => {
                return ref.where('dev_team', "array-contains", type)
            });
            return this.projets = this.projCollection.snapshotChanges().pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Project;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    });
                })
            );
        } 

    }
    getprojectDev(projectsTab:Project[] ,id: string): Project[] {
        let devs: Project[] = [];
        
        projectsTab.forEach((p) => {
            if (p.dev_team.find(e => e == id)) {
                devs.push(p)
            }
            })
        return devs;
    }

    countmyProjects(id: string): Observable<Project[]>  {
        this.projCollection = this.afs.collection('Projets', ref => {
            return ref.where("chef", '==', id).orderBy("name", "asc")
        });
         return this.projets = this.projCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Project;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
         );

        
    }

    getAllProjects() {
        return this.projets;
    }
    deleteProject(notif: Project): Promise<void> {
        if (notif.CreatedByApp) {
            this.NotifDoc = this.afs.doc('/Projets/' + notif.id);
            return this.NotifDoc.delete();
        }
       
    }

    AddTask(projId: string, t: Task): Promise<void>{

        this.NotifDoc = this.afs.doc('/Projets/' + projId);
        return this.NotifDoc.ref.update({ Tasks: firebase.firestore.FieldValue.arrayUnion(t) })
    }

    DeleteTask(projId: string, t: Task): Promise<void> {

        this.NotifDoc = this.afs.doc('/Projets/' + projId);
        return this.NotifDoc.ref.update({ Tasks: firebase.firestore.FieldValue.arrayRemove(t) })
    }

    UpdateTask(projId: string, t:Task ,old:Task ): Promise<void> {
        let res: any=null;
        this.NotifDoc = this.afs.doc('/Projets/' + projId);

        // return this.NotifDoc.ref.update({ Tasks: { id: t.id, name: t.name, difficulty: t.difficulty, progress: t.progress, employee: t.employee, status: t.status } })

        this.NotifDoc.ref.update({ Tasks: firebase.firestore.FieldValue.arrayRemove(old) }).then(() => {

            return res=this.AddTask(projId, t);
        });
        return res;

    }

    updatedevmember(id: string, members: string): Promise<void> {
        this.NotifDoc = this.afs.doc('/Projets/' + id);
        return this.NotifDoc.ref.update({ dev_team: firebase.firestore.FieldValue.arrayUnion(members) })
    }




}