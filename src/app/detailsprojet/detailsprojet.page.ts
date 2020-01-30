import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Chart } from "chart.js";
import { Router } from '@angular/router';
import { ProjetService, Project, Task, DIFFICULTY, STATUS } from 'src/app/services/projet.service';
import { Observable } from 'rxjs'
import { ToastController, IonSelect, IonItem, IonList, IonCard } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailsprojet',
  templateUrl: './detailsprojet.page.html',
  styleUrls: ['./detailsprojet.page.scss'],
})
export class DetailsprojetPage implements OnInit {
    @ViewChild('barCanvas', { static: false }) barCanvas: ElementRef;
    @ViewChild('doughnutCanvas', { static: false }) doughnutCanvas: ElementRef;
    @ViewChild('lineCanvas', { static: false }) lineCanvas: ElementRef;
    @ViewChild('mySelect', { static: true }) selectRef: IonSelect;
    @ViewChild('SelectStatus', { static: true }) selectRefStatus: IonSelect;
    @ViewChild('SelectDifficulty', { static: true }) selectRefDifficulty: IonSelect;
    @ViewChild('SelectProgress', { static: true }) selectRefProgress: IonSelect;
     barChart: Chart;
     doughnutChart: Chart;
     lineChart: Chart;
    projetID: string;
    projet: Project;
    private taskslist;
    tableStyle = 'dark';
    Emp: any;
    NameTask: string = '';
    NewTask: Task;
    currentTask: Task;
    automaticClose = false;
    information: any[];
   
    constructor(private route: ActivatedRoute, private router: Router, private projetService: ProjetService, private toastCtrl: ToastController) {
        let recvData = this.route.snapshot.paramMap.get('id');
        this.projetID = JSON.parse(recvData)
        console.log(this.Emp);
    }
    

    ngOnInit() {
        this.loadProjet();
    }

    ngAfterViewInit() {
        this.barChartMethod();
        this.doughnutChartMethod();
        this.lineChartMethod();
    }

    loadProjet() {
        this.projetService.getProjetById(this.projetID).subscribe(p => {
            this.projet = p;
            this.taskslist = p.Tasks;
            this.information = [{
                'name': 'Business Indicators'
            }
                
            ,
                {
                    'name': 'Description'
                   
            },
                {
                    'name': 'Tasks',
                    'value': p.Tasks
            }

            ];
            
        })

        this.Emp = [{ id: '1', name: 'yassine' }, { id: '2', name: 'achref' }, { id: '3', name: 'ali' }];


        
        
    }
    async open(row) {
        

    }

    getCellClass(cell) {
       
        return cell.status == 'Pending' ? 'pending_cell' : 'finished_cell';
    }

    onChange(event) {
        if (this.currentTask != null) {
            this.currentTask.employee = event.target.value
            this.projetService.UpdateTask(this.projet.id, this.currentTask).then(() => {
                this.showToast('The task employee has been Updated :)');
                this.loadProjet();
            }, err => {
                this.showToast('There was a problem Updating the task employee :(');
                console.log(err);
            });

        }
    }

    onChangeStatus(event) {
        
        if (this.currentTask != null) {
            this.currentTask.status = event.target.value
            this.projetService.UpdateTask(this.projet.id, this.currentTask).then(() => {
                this.showToast('The task status has been Updated :)');
                this.loadProjet();
            }, err => {
                    this.showToast('There was a problem Updating the task status :(');
                console.log(err);
            });

        }
    }
    onChangeDifficulty(event) {

        if (this.currentTask != null) {
            this.currentTask.difficulty = event.target.value
            this.projetService.UpdateTask(this.projet.id, this.currentTask).then(() => {
                this.showToast('The task difficulty has been Updated :)');
                this.loadProjet();
            }, err => {
                    this.showToast('There was a problem Updating the task difficulty :(');
                console.log(err);
            });

        }
    }
    onChangeProgress(event) {

        if (this.currentTask != null) {
            this.currentTask.progress = event.target.value
            this.projetService.UpdateTask(this.projet.id, this.currentTask).then(() => {
                this.showToast('The work progress has been Updated :)');
                this.loadProjet();
            }, err => {
                    this.showToast('There was a problem Updating the work progress :(');
                console.log(err);
            });

        }
    }
    openSelect(row) {
        this.currentTask = row;
        this.selectRef.open();
    }

    openSelectStatus(row) {
        this.currentTask = row;
        this.selectRefStatus.open();
    }
    openSelectDifficulty(row) {
        this.currentTask = row;
        this.selectRefDifficulty.open();
    }
    openSelectProgress(row) {
        this.currentTask = row;
        this.selectRefProgress.open();
    }

    AddTask() {
        if (this.NameTask != null) {

            this.NewTask = { name: this.NameTask, difficulty: DIFFICULTY.PENDING, progress: 0, employee: [], status: STATUS.Pending };
            this.projetService.AddTask(this.projet.id, this.NewTask).then(() => {
                this.showToast('Your new task  has been added :)');
                this.loadProjet();
            }, err => {
                this.showToast('There was a problem adding the task :(');
                console.log(err);
            });
        }
    }

    DeleteTask(row) {
        this.projetService.DeleteTask(this.projet.id, row).then(() => {
            this.showToast('The task  has been deleted :)');
            this.loadProjet();
        }, err => {
            this.showToast('There was a problem deleting the task :(');
            console.log(err);
        });
    
    }


    showToast(msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000
        }).then(toast => toast.present());
    }

    barChartMethod() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
                datasets: [{
                    label: '# First Value',
                    data: [200, 50, 30, 15, 20, 34],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    doughnutChartMethod() {
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['BJP', 'Congress', 'AAP', 'CPM', 'SP'],
                datasets: [{
                    label: '# of Votes',
                    data: [50, 29, 15, 10, 7],
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 0.5)'
                    ],
                    hoverBackgroundColor: [
                        '#FFCE56',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF6384'
                    ]
                }]
            }
        });
    }

    lineChartMethod() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
                datasets: [
                    {
                        label: 'Sell per week',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
                        spanGaps: false,
                    }
                ]
            }
        });
    }
 

    toggleSection(index) {

        this.information[index].open = !this.information[index].open;

        if (this.automaticClose && this.information[index].open) {

            this.information.filter((item, itemIndex) => itemIndex != index)
            .map(item => item.open =false);

        }
    }

    toggleItem(index, childIndex) {
        this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
    }


}
