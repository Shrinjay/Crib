import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CrimeMetrics } from 'src/app/types/api_types';

@Component({
  selector: 'app-crime-card',
  templateUrl: './crime-card.component.html',
  styleUrls: ['./crime-card.component.css']
})
export class CrimeCardComponent implements OnChanges {
  @Input() crimeMetrics: CrimeMetrics = {} as CrimeMetrics;
  viewMetrics: {[key: string]: string | number}[] = []
  metricNames: {[key: string]: string} = {
    'violent': "Violent Crimes",
    'disturbance': "Public Disturbances",
    'stolen_goods': "Theft and Stolen Goods",
    'index': "Crime Index"
  }

  constructor() { }

  ngOnChanges(): void {
    this.viewMetrics = Object.entries(this.crimeMetrics).map(([k, v]) => ({key: this.metricNames[k], value: Math.round(v)}))
  }

}
