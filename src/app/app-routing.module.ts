import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ContactResolver } from './shared/contact-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
      {
        path: 'contacts',
        component: ContactComponent,
      },
      {
        path: 'contacts/:contactId',
        component: ContactViewComponent,
        resolve: { data: ContactResolver },
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
