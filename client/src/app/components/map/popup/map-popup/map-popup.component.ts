import { Component, OnInit, Input } from '@angular/core';
import { Feature, Point, GeoJsonProperties } from 'geojson';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent implements OnInit {

  @Input() point: Feature<Point, GeoJsonProperties> | undefined = undefined

  constructor() { }

  ngOnInit(): void {
    console.log(this.point)
  }

}
