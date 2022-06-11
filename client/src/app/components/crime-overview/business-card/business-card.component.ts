import { Component, Input, OnInit } from '@angular/core';
import { BusinessMetrics } from 'src/app/types/api_types';
import { CardData } from 'src/app/types/crime_overview_types';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent {

  COMPARE_KEYS = new Set([
    "Total",
    "Amusement",
    "Eating"
  ])
  COMPARE_NAMES: {[key: string]: string} = {
    "Total": "the number of businesses near the average property in this city",
    "Eating": "the number of places to eat near the average property in this city",
    "Amusement": "the number of places to have fun near the average property in this city"
  }
  METRIC_NAMES: {[key: string]: string} = {
    "Total": "Businesses",
    "Amusement": "Places to have fun",
    "Eating": "Places to eat"
  }
  VALID_KEYS = new Set([
    "Total",
    "Eating",
    "Amusement"
  ])

  @Input() businessMetrics: BusinessMetrics = {} as BusinessMetrics;
  viewMetrics: CardData[] | null = null;

  constructor() { }

  ngOnChanges(): void {
    this.viewMetrics = Object.entries(this.businessMetrics)
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
      if (key === "Total") {
        obj = {
          ...obj,
          compare_value: Math.round(this.businessMetrics.Total_comparison)
        }
      } else if (key === "Eating") {
        {
          obj = {
            ...obj,
            compare_value: Math.round(this.businessMetrics.Eating_comparison)
          }
        }
      } else if (key === "Amusement") {
        {
          obj = {
            ...obj,
            compare_value: Math.round(this.businessMetrics.Amusement_comparison)
          }
        }
      }
    }

    return obj
  }

}
