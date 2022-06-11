import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CrimeMetrics } from 'src/app/types/api_types';
import {CardData} from 'src/app/types/crime_overview_types';

@Component({
  selector: 'app-crime-card',
  templateUrl: './crime-card.component.html',
  styleUrls: ['./crime-card.component.css']
})
export class CrimeCardComponent implements OnChanges {
  COMPARE_KEYS = new Set([
    'violent',
    'stolen_goods'
  ])
  COMPARE_NAMES: {[key: string]: string} = {
    "violent": "the violent crime rate for this city",
    "stolen_goods": "the theft rate for this city"
  }
  METRIC_NAMES: {[key: string]: string} = {
    'violent': "Violent Crimes",
    'stolen_goods': "Thefts"
  }
  VALID_KEYS = new Set([
    'violent',
    'stolen_goods'
  ])
  @Input() crimeMetrics: CrimeMetrics = {} as CrimeMetrics;
  viewMetrics: CardData[] | null = null;

  constructor() { }

  ngOnChanges(): void {
    this.viewMetrics = Object.entries(this.crimeMetrics)
    .filter(([key, val]) => this.VALID_KEYS.has(key))
    .map(([key, val]) => this.transformToCardData(key, val))
  }

  transformToCardData(key: any, val: any) {
    let obj: CardData = {
      name: this.METRIC_NAMES[key],
      value: Math.round(val),
      compare: this.COMPARE_KEYS.has(key)
    }

    if (this.COMPARE_KEYS.has(key)) {
      obj = {
        ...obj,
        compare_name: this.COMPARE_NAMES[key]
      }
      if (key === "violent") {
        obj = {
          ...obj,
          compare_value: Math.round(this.crimeMetrics.violent_comparison)
        }
      } else if (key === "stolen_goods") {
        obj = {
          ...obj,
          compare_value: Math.round(this.crimeMetrics.stolen_goods_comparison)
        }
      }
    }

    return obj
  }

}
