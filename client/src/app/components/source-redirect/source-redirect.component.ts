import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-source-redirect',
  templateUrl: './source-redirect.component.html',
  styleUrls: ['./source-redirect.component.css']
})
export class SourceRedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const sourceFromRoute = routeParams.get('source')!;
    this.api.incrementSourceCount(sourceFromRoute).subscribe();
    this.router.navigate(['/']);
  }

}
