import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Feature, Point, GeoJsonProperties } from 'geojson';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent implements OnInit, OnChanges {

  @Input() point: Feature<Point, GeoJsonProperties> | undefined = undefined

  constructor() { }

  ngOnInit(): void {
    if (this.point?.properties) {
      this.point.properties['distance'] = Math.round(this.point.properties['distance']);
    }
  }

  ngOnChanges() {
    if (this.point?.properties) {
      this.point.properties['distance'] = Math.round(this.point.properties['distance']);
    }
  }

}
