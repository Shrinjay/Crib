import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceRedirectComponent } from './components/source-redirect/source-redirect.component';

const routes: Routes = [
  { path: 'sources/:source', component: SourceRedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
