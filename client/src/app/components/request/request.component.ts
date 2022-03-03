/// <reference types="@types/googlemaps" />
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { GenerateMetricsRequest } from 'src/app/types/api_types';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, AfterViewInit {
  @ViewChild('addressinput') addressInput: any;
  request: GenerateMetricsRequest = {} as GenerateMetricsRequest;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    const options = {
      componentRestrictions: { country: "ca" },
      fields: ["geometry", "name"]
    };

    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
  });
  }

  invokeEvent(place: google.maps.places.PlaceResult) {
    if (place.geometry && place.geometry.location) {
      this.request = {
        ...this.request,
        lattitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      }
    }
  }

  onChange(event: any) {
    this.request = {
      ...this.request,
      name: event.currentTarget.value
    }
    console.log(this.request)
  }

  onClick() {
    this.api.generateCrimeMetrics(this.request).subscribe(data => {
      if (data) alert('Succesfully generated metrics')
    })
  }

}
