import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Chart } from "chart.js";
import { Router } from '@angular/router';
import { ProjetService, Project, Task } from 'src/app/services/projet.service';
import { Observable } from 'rxjs'
import { ToastController } from '@ionic/angular';
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

     barChart: Chart;
     doughnutChart: Chart;
     lineChart: Chart;
     projet: Project;

    constructor(private route: ActivatedRoute, private router: Router) {
        let recvData = this.route.snapshot.paramMap.get('obj');
        this.projet = JSON.parse(recvData)
        console.log(this.projet);
    }
    

    ngOnInit() {
  
    }

    ngAfterViewInit() {
        this.barChartMethod();
        this.doughnutChartMethod();
        this.lineChartMethod();
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
 
}
