import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { PatientStatisticsService } from '../services/patientStatistics.service';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { DoctorCount } from '../model/doctorCount.model';

@Component({
  selector: 'app-patient-statistics',
  templateUrl: './patient-statistics.component.html',
  styleUrls: ['./patient-statistics.component.css']
})
export class PatientStatisticsComponent implements OnInit {


  public genderFemale: number = 0;
  public genderMale: number = 0;
  public genderOther: number = 0;
  public pediatricGroup: number = 0;
  public youngGroup: number = 0;
  public middleAgeGroup: number = 0;
  public elderlyGroup: number = 0;



  public genderChart!: Chart<"bar", number[], string>;
  public ageChart!: Chart<"bar", number[], string>;
  public doctorPediatricChart!: Chart<"bar", number[], string>;
  public doctorYoungChart!: Chart<"bar", number[], string>;
  public doctorMiddleChart!: Chart<"bar", number[], string>;
  public doctorElderlyChart!: Chart<"bar", number[], string>;




  public doctorsPediatricName: string[] = [];
  public objectDoctorsPediatricCount: DoctorCount[] = []
  public doctorsPediatricCount: number[] = []

  public doctorsYoungName: string[] = [];
  public objectDoctorsYoungCount: DoctorCount[] = []
  public doctorsYoungCount: number[] = []

  public doctorsMiddleName: string[] = [];
  public objectDoctorsMiddleCount: DoctorCount[] = []
  public doctorsMiddleCount: number[] = []

  public doctorsElderlyName: string[] = [];
  public objectDoctorsElderlyCount: DoctorCount[] = []
  public doctorsElderlyCount: number[] = []

  public selectedTab: number = 0;


  constructor(private patientStatisticsService: PatientStatisticsService, private router: Router) { }



  ngOnInit(): void {
    this.patientStatisticsService.GetFemalePatient().subscribe(numberOfFemale => {
      this.patientStatisticsService.GetMalePatient().subscribe(numberOfMale => {
        this.patientStatisticsService.GetOtherPatient().subscribe(numberOfOther => {

          this.genderFemale = numberOfFemale;
          this.genderMale = numberOfMale;
          this.genderOther = numberOfOther;

          this.DrawGenderChart()
        })
      })
    })
    this.patientStatisticsService.GetPediatricGroup().subscribe(numberOfPediatric => {
      this.patientStatisticsService.GetYoungGroup().subscribe(numberOfYoung => {
        this.patientStatisticsService.GetMiddleAgeGroup().subscribe(numberOfMiddle => {
          this.patientStatisticsService.GetElderyGroup().subscribe(numberOfElderly => {

            this.pediatricGroup = numberOfPediatric;
            this.youngGroup = numberOfYoung;
            this.middleAgeGroup = numberOfMiddle;
            this.elderlyGroup = numberOfElderly;

          })
        })
      })
    })

    this.patientStatisticsService.GetDoctorsByPediatricGroup().subscribe(doctors => {
      this.doctorsPediatricName = Object.keys(doctors);
      this.objectDoctorsPediatricCount = Object.values(doctors);
      this.objectDoctorsPediatricCount.forEach(element => {
        this.doctorsPediatricCount.push(element.doctorCount);
      });
    })

    this.patientStatisticsService.GetDoctorsByYoungGroup().subscribe(doctors => {
      this.doctorsYoungName = Object.keys(doctors);
      this.objectDoctorsYoungCount = Object.values(doctors);
      this.objectDoctorsYoungCount.forEach(element => {
        this.doctorsYoungCount.push(element.doctorCount);
      });
    })

    this.patientStatisticsService.GetDoctorsByMiddleAgeGroup().subscribe(doctors => {
      this.doctorsMiddleName = Object.keys(doctors);
      this.objectDoctorsMiddleCount = Object.values(doctors);
      this.objectDoctorsMiddleCount.forEach(element => {
        this.doctorsMiddleCount.push(element.doctorCount);
      });
    })

    this.patientStatisticsService.GetDoctorsByElderlyGroup().subscribe(doctors => {
      this.doctorsElderlyName = Object.keys(doctors);
      this.objectDoctorsElderlyCount = Object.values(doctors);
      this.objectDoctorsElderlyCount.forEach(element => {
        this.doctorsElderlyCount.push(element.doctorCount);
      });
    })
  }




  onTabChange($event: MatTabChangeEvent) {
    this.selectedTab = $event.index;

    if (this.selectedTab === 0) {
      if (this.ageChart !== undefined) this.ageChart.destroy();
      if (this.doctorPediatricChart !== undefined) this.doctorPediatricChart.destroy();
      if (this.doctorMiddleChart !== undefined) this.doctorMiddleChart.destroy();
      if (this.doctorYoungChart !== undefined) this.doctorYoungChart.destroy();
      if (this.doctorElderlyChart !== undefined) this.doctorElderlyChart.destroy();
      this.DrawGenderChart();
    }

    if (this.selectedTab === 1) {
      if (this.genderChart !== undefined) this.genderChart.destroy();
      if (this.doctorPediatricChart !== undefined) this.doctorPediatricChart.destroy();
      if (this.doctorMiddleChart !== undefined) this.doctorMiddleChart.destroy();
      if (this.doctorYoungChart !== undefined) this.doctorYoungChart.destroy();
      if (this.doctorElderlyChart !== undefined) this.doctorElderlyChart.destroy();
      this.DrawAgeChart();
    }

    if (this.selectedTab === 2) {
      if (this.genderChart !== undefined) this.genderChart.destroy();
      if (this.ageChart !== undefined) this.ageChart.destroy();
      this.DrawDoctorsPediatricChart();
      this.DrawDoctorsYoungChart();
      this.DrawDoctorsMiddleChart();
      this.DrawDoctorsElderlyChart();
    }

  }

  DrawGenderChart() {

    Chart.register(...registerables);
    this.genderChart = new Chart("genderChart", {
      type: 'bar',
      data: {
        labels: ['Female', 'Male', 'Other'],
        datasets: [{
          label: 'by gender',
          data: [this.genderFemale, this.genderMale, this.genderOther],
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawAgeChart() {

    Chart.register(...registerables);

    this.ageChart = new Chart("ageChart", {
      type: 'bar',
      data: {
        labels: ['0-14', '15-47', '48-63', '64+'],
        datasets: [{
          label: 'by age',
          data: [this.pediatricGroup, this.youngGroup, this.middleAgeGroup, this.elderlyGroup],
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          },
        }
      }
    });

  }

  DrawDoctorsPediatricChart() {

    Chart.register(...registerables);

    this.doctorPediatricChart = new Chart("doctorPediatricChart", {
      type: 'bar',
      data: {
        labels: this.doctorsPediatricName,
        datasets: [{
          label: 'chosen doctors',
          data: this.doctorsPediatricCount,
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          },
        }
      }
    });

  }

  DrawDoctorsYoungChart() {

    Chart.register(...registerables);

    this.doctorYoungChart = new Chart("doctorYoungChart", {
      type: 'bar',
      data: {
        labels: this.doctorsYoungName,
        datasets: [{
          label: 'chosen doctors',
          data: this.doctorsYoungCount,
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          },
        }
      }
    });

  }

  DrawDoctorsMiddleChart() {

    Chart.register(...registerables);

    this.doctorMiddleChart = new Chart("doctorMiddleChart", {
      type: 'bar',
      data: {
        labels: this.doctorsMiddleName,
        datasets: [{
          label: 'chosen doctors',
          data: this.doctorsMiddleCount,
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          },
        }
      }
    });

  }

  DrawDoctorsElderlyChart() {

    Chart.register(...registerables);

    this.doctorElderlyChart = new Chart("doctorElderlyChart", {
      type: 'bar',
      data: {
        labels: this.doctorsElderlyName,
        datasets: [{
          label: 'chosen doctors',
          data: this.doctorsElderlyCount,
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          },
        }
      }
    });

  }


}
