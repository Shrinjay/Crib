import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Listing } from '../../../types/api_types';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings: { [id: string]: Listing } | null = null;
  listingIds: string[] | null = null;

  constructor(private api: ApiService, private stateService: StateService) { }

  ngOnInit(): void {
    this.getListings();
  }

  getListings(): void {
    this.api.getListings()
      .subscribe(listings => {
        this.listings = listings;
        this.listingIds = Object.keys(listings);
      });
  }



  onClick(id: string): void {
    if (this.listings) {
      this.stateService.SelectedListing.next(this.listings[id]);
    }
  }

}
