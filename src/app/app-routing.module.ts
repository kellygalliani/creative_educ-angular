import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { AuthGuard } from './auth.guard';
import { SeeAllProjectsComponent } from './pages/documents/see-all-projects/see-all-projects.component';
import { WhiteboardComponent } from './pages/whiteboard/whiteboard.component';


const routes: Routes = [
  {
    path: '',
    children:[
        { path: '', component: HomeComponent },
        { path: 'documents', component: DocumentsComponent },
        { path: 'documents/see-all', component: SeeAllProjectsComponent },
        { path: 'whiteboard', component: WhiteboardComponent }
    ],
    canActivate: [AuthGuard]
},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
