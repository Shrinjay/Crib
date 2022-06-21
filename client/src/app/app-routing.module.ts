import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingResolverComponent } from './components/listing-resolver/listing-resolver/listing-resolver.component';
import { SourceRedirectComponent } from './components/source-redirect/source-redirect.component';

const routes: Routes = [
  { path: 'sources/:source', component: SourceRedirectComponent },
  {path: 'properties/:property', component: ListingResolverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
