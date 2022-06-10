import { Injectable } from '@angular/core';
import { BinnedFeatures, Features } from '../types/crime_overview_types';

@Injectable({
  providedIn: 'root'
})
export class CrimeTransformService {

  constructor() { }

  binDataByType(geoData: Features, typeKey: string): BinnedFeatures {
    const binnedFeatures: BinnedFeatures = {}

    geoData.features.forEach(feature => {
      if (feature.properties && feature.properties[typeKey]) {
        const type = feature.properties[typeKey]
        if (type in binnedFeatures) {
          binnedFeatures[type].features.push(feature)
        } else {
          binnedFeatures[type] = {
            type: "FeatureCollection",
            features: []
          }

          binnedFeatures[type].features.push(feature)
        }
      }
    })

    return binnedFeatures
  }
}
