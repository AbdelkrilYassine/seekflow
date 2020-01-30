import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, AlertController, ToastController, Platform } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { SuggestionService, Suggestion } from 'src/app/services/suggestion.service';
@Component({
  selector: 'app-createprojet',
  templateUrl: './createprojet.page.html',
  styleUrls: ['./createprojet.page.scss'],
})
export class CreateprojetPage implements OnInit {
    userID: string;
    private sub: any;
    returnpath: string = "";

    name: string = "";
    budget: string = "";
    datestart: string = "";
    dateend: string = "";

    tomorrow: Date = new Date();
    aftertomorrow: Date = new Date();
    private val: boolean = false;

    uploadPDF: any;
    fileTransfer: FileTransferObject;

    sug: Suggestion = {
        client: '',
        name: '',
        budget: 0,
        datestart: '',
        dateend: '',
        taken: '',
        path_file: '',
    };

    constructor(private router: Router, private route: ActivatedRoute, private fileOpener: FileOpener, private platform: Platform, private document: DocumentViewer, private transfer: FileTransfer, private filePath: FilePath, private filechooser: FileChooser, private file: File, public afSG: AngularFireStorage, public loadingController: LoadingController, public alertController: AlertController, public toastCtrl: ToastController, private proposalService: SuggestionService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userID = params['id']

        });
       
    }

    ionViewDidEnter() {
        this.ngOnInit();

    }
    ionViewWillEnter() {
        this.ngOnInit();
    }

    pagenotif() {
        this.router.navigateByUrl('/notfication');

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }



    async addPDF() {
        
        this.filechooser.open().then((uri) => {

            this.filePath.resolveNativePath(uri).then((nativepath) => {
                this.returnpath = nativepath;
                this.fileTransfer = this.transfer.create();
                let options: FileUploadOptions = {

                    fileKey: 'PDFFile',
                    fileName: 'file.pdf',
                    chunkedMode: false,
                    headers: {},
                    mimeType: 'application/pdf'
                }

                console.log(nativepath);
                console.log(options);
            }, (err) => {
                    alert(JSON.stringify(err));

            })
        }, (err) => {
                alert(JSON.stringify(err));
        })
        this.val = true;
        
    }
}
