import { Injectable } from '@angular/core';
import { FeatureCollection, Point } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  constructor() { }

  // transformGeoDataToViewModel(geodata: FeatureCollection): FeatureCollection {
  //   geodata.features = geodata.features.map(feature => {
  //     (feature.geometry as Point).coordinates[0]
  //   })
  // }
}
