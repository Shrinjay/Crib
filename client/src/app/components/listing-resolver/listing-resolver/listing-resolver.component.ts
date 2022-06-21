import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { Listing } from 'src/app/types/api_types';

@Component({
  selector: 'app-listing-resolver',
  templateUrl: './listing-resolver.component.html',
  styleUrls: ['./listing-resolver.component.css']
})
export class ListingResolverComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private stateService: StateService, private api: ApiService) { }

  ngOnInit(): void {
    const encodedPropertyName = this.route.snapshot.paramMap.get('property')
    const decodedPropertyName = encodedPropertyName?.replaceAll("-", " ")

    this.api.getListings().subscribe(listings => {
      const matchingProperty = Object.entries(listings).find(([id, listing]) => listing.name === decodedPropertyName)?.[1];
      if (matchingProperty) this.stateService.SelectedListing.next(matchingProperty);
      this.router.navigate(['/']);
    })
  }

}
