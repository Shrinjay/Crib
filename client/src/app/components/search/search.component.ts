/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, forkJoin, of } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { GenerateMetricsRequest, ListingId } from 'src/app/types/api_types';
import { Datasets, Listing } from 'src/app/types/api_types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('addressinput') addressInput: any;

  cities: string[] = [
    "Toronto",
    "Waterloo"    
  ]

  city_pictures: {[city: string]: string} = {
    "Toronto": "https://upload.wikimedia.org/wikipedia/commons/6/65/Toronto_Skyline_Summer_2020.jpg",
    "Waterloo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Uptown_Waterloo_Ontario.JPG/1280px-Uptown_Waterloo_Ontario.JPG"
  };

  selected_city: string = "Toronto";
  hover_city: string | null = null;

  request: GenerateMetricsRequest = {
    name: "",
    lattitude: 0.0,
    longitude: 0.0,
    district: "toronto"
  }

  loading: boolean = false;
  listings: {[id: string]: Listing} = {}
  listingArray: ListingId[] = []

  showGo: boolean = false;


  constructor(private api: ApiService, private state: StateService) { 
    this.api.getListings().subscribe(listings => {
      this.listings = listings
      this.listingArray = Object.entries(listings).map(([id, listing]) => ({id, ...listing}))
    })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    let options: any = {
      componentRestrictions: { country: "ca" },
      fields: ["geometry", "name"],
    };

    if (this.selected_city === "Toronto") {
      options = {
        ...options,
        bounds: {
          east: -79.234,
          west: -79.609,
          north: 43.775,
          south: 43.585
        },
        strictBounds: true
      }
    }

    else if (this.selected_city === "Waterloo") {
      options = {
        ...options,
        bounds: {
          east: -80.435,
          west: -80.599,
          north: 43.525,
          south: 43.404
        },
        strictBounds: true
      }
    }

    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
  });
  }

  invokeEvent(place: google.maps.places.PlaceResult) {
    if (place.geometry && place.geometry.location) {
      this.showGo = true;
      this.request = {
        ...this.request,
        name: place.name,
        lattitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      }
    }
  }

  onButtonClick() {
    if (this.request.name === "") {
      alert('That address is inavlid, try clicking on one of the suggestions!')
      this.loading = false;
      return;
    }

    this.loading = true;
    const selectedListing = Object.values(this.listings).find(listing => listing.name === this.request.name)
      if (selectedListing) {
        this.state.SelectedListing.next(selectedListing)
        this.loading = false;
      } else {
        if (this.request.district === "waterloo") {
          this.api.generateCrimeMetrics(this.request)
          .pipe(
            catchError(_ => {
              alert("Sorry, we couldn't process your request! Please try again.");
              this.loading = false;
              return of(false)
            })
          )
          .subscribe(result => {
            if (result) {
              this.api.getListings()
              .subscribe(listings => {
                if (listings) {
                  const selectedListing = Object.values(listings).find(listing => listing.name === this.request.name) as Listing
                  this.state.SelectedListing.next(selectedListing)
                  this.loading = false;
                }
              })
            }
          })
        }
        else {
          forkJoin([this.api.generateCrimeMetrics(this.request), this.api.generateBusinessMetrics(this.request)])
          .pipe(
            catchError(_ => {
              alert("Sorry, we couldn't process your request! Please try again.");
              this.loading = false;
              return of(false)
            })
          )
        .subscribe(result => {
          if (result) {
            this.api.getListings().subscribe(listings => {
              const selectedListing = Object.values(listings).find(listing => listing.name === this.request.name) as Listing
              this.state.SelectedListing.next(selectedListing)
              this.loading = false;
            })
          }
        })
        } 
      }
  }

  onClick(city: string) {
    this.selected_city = city;
    this.state.SelectedCity.next(city);
    this.resetRequest();

    this.ngAfterViewInit();
  }

  onHover(city: string) {
    this.hover_city = city;
  }

  hoverExit(city: string) {
    this.hover_city = null;
  }

  onLinkClick(id: string) {
    const selectedListing = this.listings[id]
    console.log(selectedListing)
    this.state.SelectedListing.next(selectedListing)
  }

  onSearchChanged(event: Event) {
    this.resetRequest();
  }

  resetRequest() {
    this.request = {
      name: "",
      lattitude: 0.0,
      longitude: 0.0,
      district: "toronto"
    };
    this.showGo = false;
  }
}
