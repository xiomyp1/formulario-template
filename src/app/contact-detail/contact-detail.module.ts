import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; 
import { ContactDetailComponent } from './contact-detail.component';
import { ContactDetailShellComponent } from './contact-detail-shell/contact-detail-shell.component';
import { ContactDetailResolverService } from './contact-detail-resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { startWithCapitalValidator, startsWithCapitalValidatorDirective } from '../directives/startWithCapital.directive';

const contactDetailRoutes:Routes = [
    { path: 'contact-detail', component: ContactDetailShellComponent, data:{title: "Contact detail"},
    children: [
      { path: '', component:ContactFormComponent },
      { path: ':id', component:ContactDetailComponent, 
        resolve:{ contact:ContactDetailResolverService }
      }
    ],
    canActivate: [ AuthGuard ] 
  },
];

@NgModule({
    imports: [
        CommonModule,
        CommonModule,
        RouterModule.forChild(contactDetailRoutes),
        FormsModule
    ],
    declarations:[
        ContactDetailComponent,
        ContactDetailShellComponent,
        ContactFormComponent,
        startsWithCapitalValidatorDirective
    ]

})
export class ContactDetailModule { }