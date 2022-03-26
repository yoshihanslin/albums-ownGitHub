import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "welcome", component: WelcomeComponent },
  {path: "login", component: LoginComponent},
  { path: "tasks", component: TaskListComponent },
  { path: "about", component: AboutComponent ,canActivate: [AuthGuard] },
  {
    path: "albums",
    loadChildren: () => import('./albums/albums.module')
      .then(mod => {
        return mod.AlbumsModule;
      }),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
