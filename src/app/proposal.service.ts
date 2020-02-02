import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProposalService {

    constructor(public firebaseNative: Firebase,
        public afs: AngularFirestore,
        private platform: Platform) { }


    async getToken() {

        let token;

        if (this.platform.is('android')) {
            token = await this.firebaseNative.getToken()
        }

        if (this.platform.is('ios')) {
            token = await this.firebaseNative.getToken();
            await this.firebaseNative.grantPermission();
        }

        return this.saveTokenToFirestore(token)
    }

    private saveTokenToFirestore(token) {
        if (!token) return;

        const devicesRef = this.afs.collection('devices')

        const docData = {
            token,
            userId: 'testUser',
        }

        return devicesRef.doc(token).set(docData)
    }

    listenToNotifications() {
        return this.firebaseNative.onNotificationOpen()
    }
}
